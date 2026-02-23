const Availability = require("../models/Availability");
const { toMinutes, toTimeString } = require("../utils/time");
exports.getAllAvailabilityOfMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const availabilities = await Availability.find({ user: userId })
      .populate("user", "name email age gender bio")
      .populate({
        path: "match",
        populate: {
          path: "users",
          select: "name email age gender bio",
        },
      })
      .sort({ createdAt: -1 });

    const result = availabilities.map((a) => {
      const partner = a.match.users.find(
        (u) => u._id.toString() !== userId
      );

      return {
        _id: a._id,
        match: a.match._id,
        partner,
        slots: a.slots,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
exports.getMyAvailability = async (req, res) => {
  const userId = req.user.id;
  const { matchId } = req.params;

  const availability = await Availability.findOne({
    user: userId,
    match: matchId,
  });

  res.json(availability?.slots || []);
};
exports.saveAvailability = async (req, res) => {
  try {
    const userId = req.user.id;
    const { matchId, slots } = req.body;

    if (!matchId || !Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 21);

    const existingAvailability = await Availability.findOne({
      user: userId,
      match: matchId,
    });

    for (const slot of slots) {
      const { date, from, to } = slot;

      if (!date || !from || !to) {
        return res.status(400).json({ message: "Slot không hợp lệ" });
      }

      if (toMinutes(from) >= toMinutes(to)) {
        return res
          .status(400)
          .json({ message: "Thời gian from phải nhỏ hơn to" });
      }

      const slotDate = new Date(date);
      slotDate.setHours(0, 0, 0, 0);

      if (slotDate < today || slotDate > maxDate) {
        return res
          .status(400)
          .json({ message: "Chỉ được chọn trong 3 tuần tới" });
      }
      if (existingAvailability) {
        const conflict = existingAvailability.slots.some((oldSlot) => {
          const oldDate = new Date(oldSlot.date);
          oldDate.setHours(0, 0, 0, 0);

          return (
            oldDate.getTime() === slotDate.getTime() &&
            toMinutes(from) < toMinutes(oldSlot.to) &&
            toMinutes(to) > toMinutes(oldSlot.from)
          );
        });

        if (conflict) {
          return res.status(400).json({
            message: `Ngày ${date} đã chọn khung giờ trùng`,
          });
        }
      }
    }

    // ✅ Không trùng → lưu
    const availability = await Availability.findOneAndUpdate(
      { user: userId, match: matchId },
      { $push: { slots: { $each: slots } } },
      { new: true, upsert: true }
    );

    res.json({ success: true, availability });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.findFirstCommonSlot = async (req, res) => {
  try {
    const { matchId } = req.params;

    const availabilities = await Availability.find({ match: matchId });

    if (availabilities.length < 2) {
      return res.json({
        found: false,
        message: "Đang chờ đối phương chọn thời gian rảnh",
      });
    }

    const [A, B] = availabilities;
    const commonSlots = [];

    for (const slotA of A.slots) {
      for (const slotB of B.slots) {
        if (slotA.date !== slotB.date) continue;

        const start = Math.max(
          toMinutes(slotA.from),
          toMinutes(slotB.from)
        );
        const end = Math.min(
          toMinutes(slotA.to),
          toMinutes(slotB.to)
        );

        if (start < end) {
          commonSlots.push({
            date: slotA.date,
            start,
            end,
          });
        }
      }
    }

    if (commonSlots.length === 0) {
      return res.json({
        found: false,
        message: "Chưa tìm được thời gian trùng. Vui lòng chọn lại.",
      });
    }

    commonSlots.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.start - b.start;
    });

    const first = commonSlots[0];

    return res.json({
      found: true,
      date: first.date,
      from: toTimeString(first.start),
      to: toTimeString(first.end),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
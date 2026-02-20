const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      total: profiles.length,
      profiles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};
exports.getMyProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const profile = await Profile.findById(userId).select("-password");

    if (!profile) {
      return res.status(404).json({
        message: "Không tìm thấy profile",
      });
    }

    return res.status(200).json({
      message: "Lấy thông tin cá nhân thành công",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Thiếu profile id",
      });
    }

    const profile = await Profile.findById(id).select("-password");

    if (!profile) {
      return res.status(404).json({
        message: "Không tìm thấy profile",
      });
    }

    return res.status(200).json({
      message: "Lấy profile thành công",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Đăng xuất thành công",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Đăng xuất thất bại",
      error: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email và mật khẩu bắt buộc" });
    }

    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Đăng nhập thất bại",
      error: err.message,
    });
  }
};
exports.register = async (req, res) => {
  try {
    const { email, name, age, gender, bio, password } = req.body;

    if (!email || !password || !name || !age || !gender || !bio) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const existUser = await Profile.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Profile.create({
      email,
      name,
      age,
      gender,
      bio,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        age: newUser.age,
        gender: newUser.gender,
        bio: newUser.bio,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Đăng ký thất bại",
      error: err.message,
    });
  }
};
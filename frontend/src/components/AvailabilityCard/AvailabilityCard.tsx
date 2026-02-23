import { formatDate } from "../../utils/formatDate";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { useFirstSlotAvailability } from "../../hooks/useFirstSlotAvailability";
import type {
  MyAvailabilityResponse,
  AvailabilitySlot,
} from "../../types/availability";

interface Props {
  availability: MyAvailabilityResponse;
  token: string | null;
}

export const AvailabilityCard = ({ availability, token }: Props) => {
  const { data } = useFirstSlotAvailability(availability.match, token);

  const hasCommonSlot =
    !!data?.found && !!data.date && !!data.from && !!data.to;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <p className="mb-4 flex items-center font-semibold text-gray-700">
        <FiUser className="mr-2 text-pink-500" />
        Bạn đã chọn lịch với:
        <span className="ml-1 text-pink-500">
          {availability.partner?.name || "Chưa xác định"}
        </span>
      </p>

      {hasCommonSlot ? (
        <p className="mb-4 text-sm font-semibold text-green-600">
          Hai bạn có date hẹn vào:{" "}
          {formatDate(data.date)} {data.from} – {data.to}
        </p>
      ) : (
        <p className="mb-4 text-sm font-semibold text-red-600">
           Chưa tìm được thời gian trùng. Vui lòng chọn lại.
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {availability.slots.map((slot: AvailabilitySlot, index: number) => {
          const matched =
            hasCommonSlot &&
            slot.date === data.date &&
            slot.from === data.from &&
            slot.to === data.to;

          return (
            <div
              key={`${slot.date}-${slot.from}-${index}`}
              className={`rounded-xl border px-4 py-3 ${
                matched
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`mb-1 flex items-center text-sm ${
                  matched ? "text-green-700" : "text-gray-600"
                }`}
              >
                <FiCalendar className="mr-2" />
                {formatDate(slot.date)}
              </p>

              <p
                className={`flex items-center font-medium ${
                  matched ? "text-green-800" : "text-gray-800"
                }`}
              >
                <FiClock className="mr-2" />
                {slot.from} – {slot.to}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
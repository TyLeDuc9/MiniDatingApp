
import { useNavigate, useParams } from "react-router-dom";
import { useChooseDate } from "../../hooks/useChooseDate";
import { useAvailabilityMe } from "../../hooks/useAvailabilityMe";
import { getAvailabilityDateRange } from "../../constants/getDayThreeWeek";

export const DateScheduler: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { slots: mySlots } = useAvailabilityMe(matchId!, token);
  const {
    date,
    setDate,
    selected,
    confirmedSlots,
    toggleSlot,
    isDisabledSlot,
    handleConfirm,
    TIME_SLOTS,
    loading,
    error,
  } = useChooseDate(mySlots);

  const { minDate, maxDate } = getAvailabilityDateRange();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 mt-16 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-pink-500">
          Chọn lịch hẹn
        </h1>

        {/* Date */}
        <input
          type="date"
          value={date}
          min={minDate}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 mb-6"
        />

        {/* Slots */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          {TIME_SLOTS.map(([from, to], i) => {
            const isConfirmed = confirmedSlots[date]?.includes(i);
            const disabled = isDisabledSlot(from) || isConfirmed;

            return (
              <button
                key={i}
                disabled={disabled}
                onClick={() => toggleSlot(i)}
                className={`rounded border border-gray-300 py-2 text-sm
                  ${
                    disabled
                      ? isConfirmed
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selected.includes(i)
                        ? "bg-pink-500 text-white"
                        : "hover:bg-pink-100 cursor-pointer"
                  }`}
              >
                {from} - {to}
              </button>
            );
          })}
        </div>
        <div className="my-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border bg-white"></span>
            <span>Có thể chọn</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-pink-500"></span>
            <span>Đang chọn</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-green-500"></span>
            <span>Đã xác nhận</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-gray-300"></span>
            <span>Không khả dụng</span>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button
          onClick={()=>navigate('/my-match')}
            className="w-full rounded-full cursor-pointer bg-black text-white py-2 text-sm 
          font-medium  hover:bg-black/80"
          >
            Quay lại
          </button>
          <button
            disabled={loading}
            onClick={() => matchId && handleConfirm(matchId)}
            className="w-full rounded-full cursor-pointer border py-2 text-sm font-medium 
            bg-pink-600 text-white disabled:opacity-50 hover:bg-pink-500"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

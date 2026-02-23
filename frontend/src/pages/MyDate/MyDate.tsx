import { useAllAvailability } from "../../hooks/useAllAvailability";
import { AvailabilityCard } from "../../components/AvailabilityCard/AvailabilityCard";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useEffect } from "react";
export const MyDate = () => {
  const token = localStorage.getItem("token");
  const { availabilities, loading, error } = useAllAvailability(token);
  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 mt-20 text-center text-3xl font-bold text-pink-500">
          Lịch hẹn đã chọn
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {availabilities.map((availability) => (
            <AvailabilityCard
              key={availability._id}
              availability={availability}
              token={token}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

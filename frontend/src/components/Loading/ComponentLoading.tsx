import { useLoading } from "../../context/LoadingContext";
export const ComponentLoading = () => {
  const { componentsLoading } = useLoading();
  if (!componentsLoading) return null;

  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-14 w-14  border-t-4 border-b-4 border-pink-400"></div>
    </div>
  );
};

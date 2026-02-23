import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getAllProfile } from "../../redux/Profile/profileThunk";
import { AiOutlineLike } from "react-icons/ai";
import { useLike } from "../../hooks/useLike";
import { useGetMeLike } from "../../hooks/useGetMeLike";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const Item = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { profiles, loading } = useSelector(
    (state: RootState) => state.profile,
  );

  const { likedUserIds, setLikedUserIds } = useGetMeLike();
  const { handleLike, currentUser } = useLike(setLikedUserIds);
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    dispatch(getAllProfile());
  }, [dispatch]);

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;

  return (
    <div className="py-12 px-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-pink-400">
        Dating
      </h2>

      <div className="grid gap-6 grid-cols-4">
        {profiles.map((item) => {
          if (item._id === currentUser?._id) return null;
          const isLiked = likedUserIds.includes(item._id);

          return (
            <div
              key={item._id}
              className="rounded-2xl bg-white p-5 shadow-md flex flex-col h-full"
            >
              <div className="mb-4 flex justify-center">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full  text-sm font-bold text-white ${isLiked ? "bg-pink-500" : "bg-blue-400"}`}
                >
                  {item.name}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-600">
                  {item.email}
                </h3>
                <p className="text-sm text-gray-500">Tuổi:{item.age}</p>
                <p className="text-sm text-gray-500">
                  Giới tính: {item.gender}
                </p>

                <p className="my-2 text-sm text-gray-600 line-clamp-3">
                  Mô tả: {item.bio}
                </p>
              </div>

              <button
                onClick={() => handleLike(item._id)}
                disabled={isLiked}
                className={`mt-auto flex items-center justify-center gap-2 w-full
                  rounded-full py-2 text-sm font-medium text-white transition
                  ${
                    isLiked
                      ? "bg-pink-400 cursor-not-allowed"
                      : "bg-blue-400 cursor-pointer hover:bg-blue-600"
                  }`}
              >
                <AiOutlineLike className="text-xl" />
                <span>{isLiked ? "Đã thích" : "Thích"}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

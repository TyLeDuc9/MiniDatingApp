import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getAllProfile } from "../../redux/Profile/profileThunk";
import { AiOutlineLike } from "react-icons/ai";

export const Item = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, loading } = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    dispatch(getAllProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-lg text-gray-500">
        Loading profiles...
      </div>
    );
  }

  return (
    <div className=" py-12 px-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-pink-400">
        Gặp gỡ mọi người
      </h2>

      <div className="grid gap-6 grid-cols-4">
        {profiles.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl bg-white p-5 shadow-md flex flex-col h-full"
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 p-12 items-center justify-center rounded-full bg-pink-500
               text-sm font-bold text-white">
                {item.name}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-600">
                {item.email}
              </h3>
              <p className="text-sm text-gray-500 capitalize">{item.gender}</p>

              <p className="my-2 text-sm text-gray-600 line-clamp-3">
                Mô tả: {item.bio}
              </p>
            </div>
            <button
              className="mt-auto flex justify-center w-full rounded-full bg-blue-500 py-2 text-sm
    font-medium text-white transition hover:bg-blue-600 cursor-pointer"
            >
              <AiOutlineLike className="text-2xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

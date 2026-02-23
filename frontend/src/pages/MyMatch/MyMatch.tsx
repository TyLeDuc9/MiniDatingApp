import { useNavigate } from "react-router-dom";
import { useGetMeMatch } from "../../hooks/useGetMeMatch";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const MyMatch = () => {
  const { matches, loading, error, currentUser } = useGetMeMatch();

  const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile,
  );
  const navigate = useNavigate();

  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading || profileLoading) return <ComponentLoading />;

  if (error) return <div>Lỗi tải</div>;

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="">
        <h1 className="mb-6 mt-20 text-center text-3xl font-bold text-pink-500">
          My Match
        </h1>

        {/* List */}
        <div className="relative z-10 px-6 py-16">
          <div className="grid grid-cols-4 gap-6">
            {profile ? (
              matches.length === 0 ? (
                <p className="col-span-4 text-center text-gray-400 text-lg">
                  Bạn chưa có match nào
                </p>
              ) : (
                matches.map((match) =>
                  match.users.map((user) => {
                    if (user._id === currentUser?._id) return null;

                    return (
                      <div
                        key={`${match._id}-${user._id}`}
                        className="rounded-2xl bg-white p-5 shadow-md flex flex-col h-full"
                      >
                        {/* avatar */}
                        <div className="mb-4 flex justify-center">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                            {user.name}
                          </div>
                        </div>

                        {/* info */}
                        <div className="text-center">
                          <h3 className="text-sm font-semibold text-gray-600">
                            {user.email}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Tuổi: {user.age}
                          </p>
                          <p className="text-sm text-gray-500">
                            Giới tính: {user.gender}
                          </p>
                          <p className="my-2 text-sm text-gray-600 line-clamp-3">
                            Mô tả: {user.bio}
                          </p>
                        </div>

                        <button
                          onClick={() => navigate(`/date/${match._id}`)}
                          className="mt-auto w-full rounded-full bg-pink-400 py-2 text-sm font-medium text-white hover:bg-pink-500"
                        >
                          Hẹn
                        </button>
                      </div>
                    );
                  }),
                )
              )
            ) : (
              <p className="col-span-4 text-center text-red text-lg font-medium">
                Bạn chưa đăng nhập
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

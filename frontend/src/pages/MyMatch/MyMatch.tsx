import bck1 from "../../assets/backGround/bck1.jpg";
import { useGetMeMatch } from "../../hooks/useGetMeMatch";

export const MyMatch = () => {
  const { matches, loading, error, currentUser } = useGetMeMatch();
  if (loading) {
    return (
      <div className="flex justify-center py-20 text-lg text-gray-500">
        Loading profiles...
      </div>
    );
  }
  if (error) return <div>Lỗi tải</div>;
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[75vh] overflow-hidden">
        <img
          src={bck1}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            My Matches
          </h1>
        </div>
      </div>

      <div className="relative z-10 px-6 py-16 text-white">
        <div className="grid grid-cols-4 gap-6">
          {matches.map((match) =>
            match.users.map((user) => {
              if (user._id === currentUser?._id) return null;
              return (
                <div
                  key={user._id}
                  className="rounded-2xl bg-white p-5 shadow-md flex flex-col h-full"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                      {user.name}
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-600">
                      {user.email}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {user.gender}
                    </p>
                    <p className="my-2 text-sm text-gray-600 line-clamp-3">
                      Mô tả: {user.bio}
                    </p>
                  </div>
                  <button
                    className={`mt-auto flex items-center justify-center gap-2 w-full
                  rounded-full py-2 text-sm font-medium text-white transition bg-pink-400 cursor-pointer`}
                  >
                    <span>Hẹn</span>
                  </button>
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
};

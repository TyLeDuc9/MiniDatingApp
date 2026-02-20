import background from "../../assets/backGround/backGround.jpg";
import { Item } from "../../components/Item/Item";
export const Home = () => {
  return (
   <div>
     <div className="relative w-full h-[75vh] overflow-hidden">
      <img
        src={background}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white pl-12">
        <h1 className="text-5xl font-extrabold mb-8 leading-tight">
          Welcome to <br />
          <span className="text-pink-500">Mini Dating App</span>
        </h1>

        <p className="text-lg max-w-xl opacity-90">
          Kết nối – Thích – Match <br />
          Tìm người phù hợp với bạn chỉ trong vài giây
        </p>
      </div>
    </div>
    <Item/>
   </div>
  );
};

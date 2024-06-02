import React from "react";
import { RandomAvatar } from "react-random-avatars";
import Trackinfo from "./Trackinfo";

const Hero = (props) => {
  const { track } = props;
  return (
    <div className="w-full px-4 mt-6">
      <div
        className="
        bg-gradient-to-r from-violet-500 to-pink-400
          object-contain bg-no-repeat w-full h-72 rounded-2xl flex flex-col justify-end 
        "
      >
        <div className="px-10 py-4">
          <div className="flex justify-around">
            <div className="flex items-center gap-2 w-5/12">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsK4_r1B9Z5hRIbJ1i6C0UZYkx8CKo0y45Hh3b22_mo1j_7jGOE0BWSu__nO-6p6R-XJI&usqp=CAU"
                className="w-12 h-12 object-contain rounded-full"
              />
              <div>
                <h1 className="text-xl text-white font-semibold">
                {track?.name}
                </h1>
                <p className="text-white font-light">Sembonzakura Kageyoshi</p>
              </div>
            </div>
            <div className="flex gap-4 justify-around w-full">
              <div>
                <h1 className="text-zinc-100 font-bold">CREATED</h1>
                <p className="font-medium text-zinc-200">
                  {track?.created_at}
                </p>
              </div>
              <div>
                <h1 className="text-zinc-100 font-bold">UPDATED</h1>
                <p className=" font-medium text-zinc-200">
                  {track?.updated_at}
                </p>
              </div>
              <div>
                <h1 className="text-zinc-100 font-bold">DEADLINE</h1>
                <p className="font-medium text-zinc-200">
                  {track?.deadline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Trackinfo track={track} />
    </div>
  );
};

export default Hero;

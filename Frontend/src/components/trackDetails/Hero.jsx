import React from "react";
import { RandomAvatar } from "react-random-avatars";
import Trackinfo from "./trackinfo";


const Hero = () => {
  return (
    <div className="w-full px-4 mt-6">
      <div
        className="
        bg-gradient-to-r from-violet-500 to-pink-500
          object-contain bg-no-repeat w-full h-72 rounded-2xl flex flex-col justify-end opacity-70
        "
      >
        <div className="px-10 py-4">
          <div className="flex justify-around">
            <div className="flex items-center gap-2 w-5/12">
              <img
                src="https://cdn.pixabay.com/photo/2022/09/11/06/01/apple-7446229_960_720.png"
                className="w-12 h-12 object-contain rounded-full"
              />
              <div>
                <h1 className="text-xl text-white font-semibold">
                  Bankai Dayo
                </h1>
                <p className="text-white font-light">Sembonzakura Kageyoshi</p>
              </div>
            </div>
            <div className="flex gap-4 justify-around w-full">
              <div>
                <h1 className="text-black font-bold">CREATED</h1>
                <p className="font-medium text-black">12th September, 2021</p>
              </div>
              <div>
                <h1 className="text-black font-bold">UPDATED</h1>
                <p className=" font-medium text-black">12th September, 2021</p>
              </div>
              <div>
                <h1 className="text-black font-bold">DEADLINE</h1>
                <p className="font-medium text-black">30th September, 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Trackinfo />
    </div>
  );
};

export default Hero;

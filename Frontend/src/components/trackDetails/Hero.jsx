import React from "react";
import { RandomAvatar } from "react-random-avatars";

const Hero = () => {
  return (
    <div className="w-full px-4 mt-6">
      <div
        className="
          bg-[url('https://img.freepik.com/free-photo/background-gradient-lights_23-2149304982.jpg?t=st=1716585907~exp=1716589507~hmac=b180546b4d3174c709d743658edb816ee6fa03764f94b4b10e6ad4e10c3e3ba6&w=2000')]  
          object-contain bg-no-repeat w-full h-72 rounded-lg flex flex-col justify-end opacity-70
        "
      >
        <div className="px-10 py-4">
          <div className="flex justify-around">
            <div className="flex items-center gap-2 w-5/12">
              <img
                src="https://cdn.pixabay.com/photo/2022/09/11/06/01/apple-7446229_960_720.png"
                className="w-12 h-12 object-contain rounded-md"
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
                <h1 className="text-slate-700/80 font-semibold">CREATED</h1>
                <p className="font-light text-black">12th September, 2021</p>
              </div>
              <div>
                <h1 className="text-slate-700/80 font-semibold">UPDATED</h1>
                <p className="font-light text-black">12th September, 2021</p>
              </div>
              <div>
                <h1 className="text-slate-700/80 font-semibold">DEADLINE</h1>
                <p className="font-light text-black">30th September, 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

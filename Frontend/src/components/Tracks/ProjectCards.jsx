import React from "react";
import { RandomAvatar } from "react-random-avatars";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProjectCards = () => {
  return (
    <div className="flex flex-wrap gap-5 py-2 mt-2">
      <div className="bg-white border rounded-lg p-2 cursor-pointer">
        <div>
          <img src="/Rectangle28.png" />
        </div>
        <div className="flex items-center gap-1 p-2 mt-1">
          <div>
            <RandomAvatar name="youtube" size={30} />
          </div>
          <div className="flex justify-between gap-1 w-full">
            <h1>Bankai</h1>
            {/* <h1 className="text-sm">
                    Sembonzakura KageYoshi
                </h1> */}
            <div className="cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>
        <div className="p-2 flex gap-2 flex-wrap">
          <h1 className="bg-[#fd71b03b] w-fit rounded-full px-2 py-[1px] text-[#FD71AF]">
            4.hrs ago
          </h1>
          <h1 className="bg-[#5577ff54] w-fit rounded-full px-2 py-[1px] text-[#5577FF]">
            Revision
          </h1>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-2 cursor-pointer">
        <div>
          <img src="/Rectangle28.png" />
        </div>
        <div className="flex items-center gap-1 p-2 mt-1">
          <div>
            <RandomAvatar name="youtube" size={30} />
          </div>
          <div className="flex justify-between gap-1 w-full">
            <h1>Bankai</h1>
            {/* <h1 className="text-sm">
                    Sembonzakura KageYoshi
                </h1> */}
            <div className="cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>
        <div className="p-2 flex gap-2 flex-wrap">
          <h1 className="bg-[#fd71b03b] w-fit rounded-full px-2 py-[1px] text-[#FD71AF]">
            4.hrs ago
          </h1>
          <h1 className="bg-[#5577ff54] w-fit rounded-full px-2 py-[1px] text-[#5577FF]">
            Revision
          </h1>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-2 cursor-pointer ">
        <div>
          <img src="/Rectangle28.png" />
        </div>
        <div className="flex items-center gap-1 p-2 mt-1">
          <div>
            <RandomAvatar name="youtube" size={30} />
          </div>
          <div className="flex justify-between gap-1 w-full">
            <h1>Bankai</h1>
            {/* <h1 className="text-sm">
                    Sembonzakura KageYoshi
                </h1> */}
            <div className="cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>
        <div className="p-2 flex gap-2 flex-wrap">
          <h1 className="bg-[#fd71b03b] w-fit rounded-full px-2 py-[1px] text-[#FD71AF]">
            4.hrs ago
          </h1>
          <h1 className="bg-[#5577ff54] w-fit rounded-full px-2 py-[1px] text-[#5577FF]">
            Revision
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;

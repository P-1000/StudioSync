import React from "react";
import { FaRegClock } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { RiFilter2Fill } from "react-icons/ri";
import { FaStarHalfAlt } from "react-icons/fa";

const Trackinfo = (props) => {
  const { track } = props;
  return (
    <>
      <div className="w-full flex items-start gap-6 justify-between px-10 pt-10 py-5">
        <div className="w-2/5 flex flex-col item-center gap-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaRegClock className="text-2xl" />
              <h1 className="font-semibold">Created At</h1>
            </div>
            <h1>{track?.created_at}</h1>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTags className="text-2xl" />
              <h1 className="font-semibold">Tags</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-red-300 border rounded-2xl px-3 py-1">
                Profitable
              </span>
              <span className="bg-green-300 border rounded-2xl px-3 py-1">
                Ai
              </span>
              <span className="bg-blue-300 border rounded-2xl px-3 py-1">
                1 Person
              </span>
            </div>
          </div>
          <div className="flex justify-between w-full gap-10">
            <div className="flex items-center gap-2">
              <MdPerson className="text-2xl" />
              <h1 className="font-semibold">Members</h1>
            </div>
            {track?.memberships &&
              track.memberships.length > 0 &&
              track.memberships.map((member) => (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h1>{member?.member_username}</h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-3/5 flex flex-col items-start gap-4">
          <h1 className="text-xl font-semibold">Description</h1>
          <p className="text-gray-500">{track?.description}</p>
        </div>
      </div>
    </>
  );
};

export default Trackinfo;

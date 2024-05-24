import React from "react";
import Logo from "./Logo";
import NavItems from "./NavItems";
import Projects from "./Projects";
import ProfileButton from "./ProfileButton";

const Sidebar = () => {
  return (
    <div className="flex flex-col border gap-5 px-3 items-baseline w-60 poppins h-screen">
      <div className="px-3">
        <Logo />
      </div>
      <div className="text-slate-500 w-full font-light text-lg px-3">
        <NavItems />
      </div>
      <div className="px-3 text-slate-500 w-full py-1 flex-grow">
        <Projects />
      </div>
      <div className=" w-full mt-auto mb-5">
        <ProfileButton />
      </div>
    </div>
  );
};

export default Sidebar;

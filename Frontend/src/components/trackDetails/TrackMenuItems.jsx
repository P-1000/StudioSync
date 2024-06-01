import React, { useState, lazy, Suspense, useContext } from "react";

const Todo = lazy(() => import("./menuitems/Todo"));
const Activitylog = lazy(() => import("./menuitems/Activitylog"));
// const NewDraft = lazy(() => import("./menuitems/NewDraft"));
const NewDraft = lazy(() => import("../Drafts/DraftComponent"));
const Notes = lazy(() => import("./menuitems/Notes"));
const CreatorDraft = lazy(() => import("./menuitems/CreatorDraft"));
import { LuListTodo } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { LuActivitySquare } from "react-icons/lu";
import { AuthContext } from "../../context/userContext";

const TrackMenuItems = () => {
  const { authUser } = useContext(AuthContext);
  const role = authUser.role;
  const menuitems = [
    {
      id: 1,
      name: "To Do",
      component: Todo,
      icon: <LuListTodo />,
    },
    {
      id: 2,
      name: "Activity Log",
      component: Activitylog,
      icon: <LuActivitySquare />,
    },
    {
      id: 3,
      name: "Drafts",
      component: role === "creator" ? CreatorDraft : NewDraft,
      icon: <MdOutlineCreateNewFolder />,
    },
    {
      id: 4,
      name: "Notes",
      component: Notes,
      icon: <TbNotes />,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(menuitems[0].id);

  const handleClick = (id) => {
    setSelectedItem(id);
  };

  const renderComponent = () => {
    const selectedMenuItem = menuitems.find((item) => item.id === selectedItem);
    const Component = selectedMenuItem ? selectedMenuItem.component : null;
    return Component ? <Component /> : null;
  };

  return (
    <div className="w-full flex flex-col items-center bg-zinc-50 p-3">
      <div className="flex justify-start border-b w-full p-2 border-zinc-300 px-5">
        {menuitems.map((item) => (
          <button
            key={item.id}
            className={`rounded-lg px-4 flex items-center hover:scale-105 transition-all hover:bg-[#5577ffba] hover:text-white gap-2 py-2 mx-2 ${
              selectedItem === item.id
                ? "bg-[#5577FF] text-white shadow border-none"
                : "bg-white border"
            }`}
            onClick={() => handleClick(item.id)}
          >
            {item.name} <span className="text-xl">{item.icon}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 w-full p-4">
        <Suspense fallback={<div>Loading...</div>}>
          {renderComponent()}
        </Suspense>
      </div>
    </div>
  );
};

export default TrackMenuItems;

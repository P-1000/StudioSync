import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Editorpage from "../../../components/dashboard/Editorpage.component";

const EditorDashboardPage = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col w-full h-screen overflow-y-auto rtl:ml-64">
        {/* <h1 className="text-3xl">Editor Dashboard</h1> */}
        <div>{/* <Editorpage /> */}</div>
      </div>
    </div>
  );
};

export default EditorDashboardPage;

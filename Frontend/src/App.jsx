import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Profile from "./components/temp/Test";
import Temp from "./Temp";
import EditorDashboardPage from "./pages/Dashboard/EditorDashboard/EditorDashboardPage";
import TrackPage from "./pages/Tracks/TrackPage";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import TrackComponent from "./components/Tracks/Track.Component";
import TrackCardPage from "./pages/Tracks/TrackCardPage";
import DemoUpload from "./components/Tracks/DemoUpload";
import CheckUser from "./components/utils/CheckUser";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

const App = () => {
  return (
    <div className="flex w-full">
      <Router>
        <MainContent />
      </Router>
    </div>
  );
};

const MainContent = () => {
  const location = useLocation();
  const hideSidebar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideSidebar && (
        <div className="w-[18%]">
          <Sidebar />
        </div>
      )}
      <div className={`main-content ${hideSidebar ? 'w-full' : 'w-[82%]'}`}>
        <Routes>
          <Route path="/" element={<CheckUser />} />
          <Route path="/tracks" element={<TrackPage />} />
          <Route path="/tracks/:id" element={<TrackCardPage />} />
          <Route path="/upload" element={<DemoUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth2callback" element={<Temp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./components/temp/Test";
import Temp from "./Temp";
import EditorDashboardPage from "./pages/Dashboard/EditorDashboard/EditorDashboardPage";
import TrackPage from "./pages/Tracks/TrackPage";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import TrackComponenet from "./components/Tracks/Track.Component";
import TrackCardPage from "./pages/Tracks/TrackCardPage";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<EditorDashboardPage />} />
            <Route path="/tracks" element={<TrackPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth2callback" element={<Temp />} />
            <Route path="/tracks/:id" element={<TrackCardPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

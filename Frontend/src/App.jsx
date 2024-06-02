import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import PingPage from "./pages/Pings/PingPage";
import AcceptInvitation from "./pages/acceptInvitation/AcceptInvitation";
import ReviewPage from "./reviewPage/ReviewPage";

const App = () => {
  return (
    <div className="flex w-full">
      <MainContent />
    </div>
  );
};

const MainContent = () => {
  const location = useLocation();

  // Function to determine if the sidebar should be hidden
  const shouldHideSidebar = () => {
    const draftRouteRegex = /^\/draft\/\d+\/review$/;
    return ["/login", "/register", "/draft/"].includes(location.pathname) || draftRouteRegex.test(location.pathname);
  };

  const hideSidebar = shouldHideSidebar();

  return (
    <>
      {!hideSidebar && (
        <div className="w-[18%]">
          <Sidebar />
        </div>
      )}
      <div className={`main-content ${hideSidebar ? "w-full" : "w-[82%]"}`}>
        <Routes>
          <Route path="/tracks" element={<TrackPage />} />
          <Route path="/tracks/:id" element={<TrackCardPage />} />
          <Route path="/upload" element={<DemoUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pings" element={<PingPage />} />
          <Route path="/oauth2callback" element={<Temp />} />
          <Route path="/draft/:id/review" element={<ReviewPage />} />
          <Route
            path="/invitation/accept/:invitationId"
            element={<AcceptInvitation />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

// NotFound component for unmatched routes
const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

export default App;

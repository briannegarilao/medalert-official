import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/Signup";
import "./App.css";
import HistoryLogs from "./pages/HistoryLogs";
import SettingPage from "./pages/Settings";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn />} />
          <Route path="/Login" index element={<LogIn />} />
          <Route path="/Dashboard" index element={<Dashboard />} />
          <Route path="/Signup" index element={<SignUp />} />
          <Route path="/HistoryLogs" index element={<HistoryLogs />} />
          <Route path="/Settings" index element={<SettingPage />} />
          <Route path="/Profile" index element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

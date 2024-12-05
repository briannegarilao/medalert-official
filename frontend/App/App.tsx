import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import SignUp from "../src/pages/Signup";
import HistoryLogs from "../src/pages/HistoryLogs";
import SettingPage from "../src/pages/Settings";
import ProfilePage from "../src/pages/ProfilePage";

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

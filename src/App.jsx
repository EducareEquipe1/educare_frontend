import React from "react";
import axios from "axios";

// Set base API URL
axios.defaults.baseURL = "http://localhost:3000"; // Update with your backend port

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forgotpassword from "./forgotpassword/Forgotpassword";
import Signup from "./signup/Signup";
import Signin from "./signin/Signin";
import Checkemail from "./checkemail/Checkemail";
import ResetPassword from "./resetPassword/ResetPassword";
import Passwordchanged from "./passwordchanged/Passwordchanged";
import Emailsent from "./emailsent/Emailsent";
import Doctors from "./AdminComponents/Doctors";
import Home from "./Home";
import Dashboard from "./AdminComponents/Dashboard";
import Users from "./AdminComponents/Users";
import FaceDetectionUploader from "./FaceDetectionComponents/FaceDetectionUploader";

const NotFound = () => <div>404 Not Found</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/checkemail" element={<Checkemail />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/passwordchanged" element={<Passwordchanged />} />
        <Route path="/emailsent" element={<Emailsent />} />
        <Route path="/Doc" element={<Doctors />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch-all for unknown routes */}
      </Routes>
    </Router>
  );
}
export default App;
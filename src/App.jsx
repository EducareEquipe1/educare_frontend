import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forgotpassword from './forgotpassword/Forgotpassword';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import Checkemail from './checkemail/Checkemail';
import ResetPassword from './resetpassword/ResetPassword';
import Home from './Home'

const NotFound = () => <div>404 Not Found</div>;

function App() {
     return(
      <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/checkemail" element={<Checkemail/>}/> 
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="*" element={<NotFound />} /> {/* Catch-all for unknown routes */}
      </Routes>
    </Router>
     )
}

export default App

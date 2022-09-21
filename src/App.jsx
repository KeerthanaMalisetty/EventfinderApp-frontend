import './App.css';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { List } from './List';
import { Signup } from './Signup';
import { About } from './About';
import { Billing } from './Billing'
import { Ticketbooking } from './Ticketbooking';
import { useState } from 'react';
import { Profile } from './Profile'
// import { Createevent } from './Createevent.jsx';
import { Adminpage } from './NewAdmin/AdminHome.jsx'
import { Dashboard } from './NewAdmin/Dashboard.jsx'
import { Eventbookings } from './NewAdmin/Eventbookings'
import { Userlist } from './NewAdmin/Userlist.jsx'
import { Editevent } from './NewAdmin/EditEvent'
import { Newevent } from './NewAdmin/AddNewevent';
import { Forgotpassword } from './Forgotpswd'
import { PasswordChange } from './Passwordchange'
import { Adminsignup } from './NewAdmin/adminsignup.jsx'
import { Conformation } from './Conformation'

// export const navbarname = createContext();
function App() {

  const [name, setName] = useState(null);
  return (
    // <navbarname.Provider value={name, setName} >
    <div className='App'>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/changepassword" element={<PasswordChange />} />
        <Route path="/eventdetails/:id" element={<About />} />
        <Route path="/musicevents/booking/:id" element={<Ticketbooking />} />
        <Route path="/musicevents/billing/:id" element={<Billing />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/adminnew" element={<Adminpage />} />
        <Route path="/adminsignup" element={<Adminsignup />} />
        <Route path="/adminnew/dashboard" element={<Dashboard />} />
        <Route path="/adminnew/bookings" element={<Eventbookings />} />
        <Route path="/adminnew/users" element={<Userlist />} />
        <Route path="/adminnew/editevent/:id" element={<Editevent />} />
        <Route path="/adminnew/addevent" element={<Newevent />} />
        {/* <Route path="/createevent" element={<Createevent />} /> */}
        <Route path="/confirmation/:id" element={<Conformation />} />
      </Routes>

    </div>
    // </navbarname.Provider>
  );
}

export default App;






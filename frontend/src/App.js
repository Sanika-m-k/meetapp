import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import supabase from './supabaseClient';
import AllocateTask from './components/AllocateTask';
import ViewTasks from './components/ViewTasks';
import MyOrganizations from './components/MyOrganizations';
import Organization from './pages/Organization';
import  Meet  from './pages/Meet';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = supabase.auth.getUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/org/:code" element={<Organization />} />
          <Route path='/meet/call_id' element={<Meet/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
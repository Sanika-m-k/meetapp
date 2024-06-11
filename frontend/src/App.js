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
          <Route path="/my-organizations" element={<MyOrganizations />} />
          <Route path="/organization/:name/allocate-task" element={<AllocateTask />} />
          <Route path="/organization/:name/tasks" element={<ViewTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-midnight-blue p-4 flex justify-between items-center text-white shadow-lg">
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-soft-blue transition duration-300">MyApp</Link>
      </div>
      {user ? (
        <div className="flex items-center space-x-6">
          <span className="text-lg">{user.email}</span>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="bg-soft-blue  hover:bg-charcoal-gray text-white py-2 px-4 rounded transition duration-300">Login</Link>
          <Link to="/signup" className="bg-soft-blue  hover:bg-charcoal-gray text-white py-2 px-4 rounded transition duration-300">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from 'react';
import supabase from '../supabaseClient';

const Logout = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      alert('Logged out successfully.');
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
    >
      Log Out
    </button>
  );
};

export default Logout;

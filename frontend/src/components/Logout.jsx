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
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default Logout;

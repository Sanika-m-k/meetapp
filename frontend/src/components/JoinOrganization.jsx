import React, { useState } from 'react';
import axios from 'axios';

const JoinOrganization = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const handleJoinOrganization = async () => {
    try {
      const response = await axios.post('https://meetapp-backend-1nm8.onrender.com/api/organizations/join', {
        code,
        email,
      });
      console.log('Joined organization:', response.data);
      setCode('');
      setEmail('');
    } catch (error) {
      console.error('Error joining organization:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-midnight-blue mb-6">Join Organization</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter organization code"
        className="w-full p-3 border border-charcoal-gray rounded mb-4 focus:outline-none focus:ring-2 focus:ring-soft-blue"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full p-3 border border-charcoal-gray rounded mb-4 focus:outline-none focus:ring-2 focus:ring-soft-blue"
      />
      <button
        onClick={handleJoinOrganization}
        className="w-full bg-midnight-blue text-white p-3 rounded hover:bg-soft-blue transition duration-300"
      >
        Join Organization
      </button>
    </div>
  );
};

export default JoinOrganization;

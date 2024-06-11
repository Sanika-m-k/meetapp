import React, { useState } from 'react';
import axios from 'axios';

const JoinOrganization = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const handleJoinOrganization = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/organizations/join', {
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
    <div>
      <h1>Join Organization</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter organization code"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleJoinOrganization}>Join Organization</button>
    </div>
  );
};

export default JoinOrganization;

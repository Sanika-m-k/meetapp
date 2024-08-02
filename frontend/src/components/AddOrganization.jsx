import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supabase from '../supabaseClient';

const AddOrganization = () => {
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

  const [organizationName, setOrganizationName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [organization, setOrganization] = useState(null);
  const [error, setError] = useState(null);

  const handleAddOrganization = async () => {
    try {
      setAdminEmail(user.email);
      console.log(user.email);
      const response = await axios.post('https://meetapp-backend-1nm8.onrender.com/api/organizations', {
        name: organizationName,
        adminEmail: user.email,
      });
      console.log('Organization added:', response.data);
      setOrganization(response.data);
      setOrganizationName('');
      setAdminEmail('');
      setError(null);
    } catch (error) {
      console.error('Error adding organization:', error);
      setError('Error adding organization');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-midnight-blue mb-6">Add Organization</h1>
      <input
        type="text"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        placeholder="Enter organization name"
        className="w-full p-3 border border-charcoal-gray rounded mb-4 focus:outline-none focus:ring-2 focus:ring-soft-blue"
      />
      <button
        onClick={handleAddOrganization}
        className="w-full bg-midnight-blue text-white p-3 rounded hover:bg-soft-blue transition duration-300"
      >
        Add Organization
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {organization && (
        <div className="mt-6 p-4 bg-soft-blue rounded">
          <h2 className="text-xl font-semibold text-white mb-2">Organization Created</h2>
          <p className="text-white">Name: {organization.name}</p>
          <p className="text-white">Code: {organization.code}</p>
          <p className="text-white">Admin Email: {organization.adminEmail}</p>
        </div>
      )}
    </div>
  );
};

export default AddOrganization;

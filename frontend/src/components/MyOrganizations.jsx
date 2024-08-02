import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import supabase from '../supabaseClient';

const MyOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
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

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        if (user) {
          const response = await axios.get(`https://meetapp-backend-1nm8.onrender.com/api/organizations/user/${user.email}`);
          setOrganizations(response.data);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, [user]);

  return (
    <div className="bg-midnight-blue w-full p-6 rounded-lg shadow-lg w-full max-w-3xl ml-32 mt-6">
      <h1 className="text-3xl font-semi-bold text-white flex justify-center pb-10 pt-4 ">Your Organizations</h1>
      <div className="space-y-6">
        {organizations.map((org) => (
          <div key={org._id} className="bg-charcoal-gray p-4 rounded-lg shadow-lg flex justify-between items-center hover:bg-soft-blue transition duration-300">
            <div>
              <Link to={`/org/${org.code}`} className="text-xl font-semibold text-gray-300 hover:text-midnight-blue">
                {org.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrganizations;

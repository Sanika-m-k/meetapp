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
          const response = await axios.get(`http://localhost:8080/api/organizations/user/${user.email}`);
          setOrganizations(response.data);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, [user]);

  return (
    <div>
      <h1>Your Organizations</h1>
      {organizations.map((org) => (

        <div key={org._id}>
\          <Link to={`/organization/${org.name}`}>
            <button>{org.name}</button>
          </Link>
          {org.adminEmail === user.email ? (
            <Link to={`/organization/${org.name}/allocate-task`}>
              <button>Allocate Task</button>
            </Link>
          ) : (
            <Link to={`/organization/${org.name}/tasks`}>
              <button>See Tasks</button>
            </Link>
          )}
          <h1>gffjg</h1>
        </div>
      ))}
    </div>
  );
};

export default MyOrganizations;

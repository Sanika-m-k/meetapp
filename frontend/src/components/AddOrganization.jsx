import React, { useState ,useEffect} from 'react';
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
      const response = await axios.post('http://localhost:8080/api/organizations', {
        name: organizationName,
        adminEmail:(user.email),
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
    <div>
      <h1>Add Organization</h1>
      <input
        type="text"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        placeholder="Enter organization name"
      />
      
      <button onClick={handleAddOrganization }>Add Organization</button>
      {error && <p>{error}</p>}
      {organization && (
        <div>
          <h2>Organization Created</h2>
          <p>Name: {organization.name}</p>
          <p>Code: {organization.code}</p>
          <p>Admin Email: {organization.adminEmail}</p>
        </div>
      )}
    </div>
  );
};

export default AddOrganization;

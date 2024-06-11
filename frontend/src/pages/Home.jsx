import React from 'react';
import AddOrganization from '../components/AddOrganization';
import JoinOrganization from '../components/JoinOrganization';
import MyOrganizations from '../components/MyOrganizations';
const Home = () => {
  

  return (
    <div>
      <AddOrganization/>
      <JoinOrganization/>
      <MyOrganizations/>
    </div>
  );
};

export default Home;

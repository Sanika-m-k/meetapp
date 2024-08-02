import React from 'react';
import AddOrganization from '../components/AddOrganization';
import JoinOrganization from '../components/JoinOrganization';
import MyOrganizations from '../components/MyOrganizations';
import Chats from '../components/Chats';
const Home = () => {
  const apiKey = 'qvam6pa3t95k';
  const userId = 'rider';
  const token = 'p7d46u23bdgfdacyvajn4fp5xaf7rt7n7h5mdrgyxaavn5kxbg98n6cxdvpvhkmd';

  return (
    <div className="min-h-screen flex justify-between bg-blue-50">
      <div className=" p-4 items-center justify-center">
        <MyOrganizations />
      </div>
      <div className=" p-4 mr-10 pr-32 mt-6 flex flex-col space-y-4">
        <AddOrganization />
        <JoinOrganization />
      </div>
    </div>
  );
};

export default Home;

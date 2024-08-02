import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchTasks from '../components/FetchTasks';
import Chats from '../components/Chats';
import supabase from '../supabaseClient';
import Members from '../components/Members';
import {Link} from 'react-router-dom';

const Organization = () => {

  const [selectedMember, setSelectedMember] = useState(null);
  const code = useParams();
  const [user, setUser] = useState(null);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    console.log(member)
  };

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

  if (!user) {
    return <div>Loading...</div>; // Show a loading state while fetching the user
  }

  return (
    <>
      <div className="p-8 bg-midnight-blue min-h-screen text-white">
      <FetchTasks />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Chats organizationCode={code} email={user.email} selectedMember={selectedMember} />
        <Members organizationCode={code} onSelectMember={handleSelectMember} />
        <Link
        to={`/meet/call_id`}
        className="w-24 bg-midnight-blue text-white p-3 rounded hover:bg-soft-blue transition duration-300"
      >Join Meet</Link>
      </div>
    </div>
    </>
  );
};

export default Organization;

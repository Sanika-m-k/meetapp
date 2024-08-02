import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  PaginatedGridLayout
} from '@stream-io/video-react-sdk';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import axios from 'axios';

const Meet = () => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
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
    const fetchCredentials = async () => {
      
      if (user) {
        try {
          const id= user.email.slice(0,8)
          console.log(id)
          const response = await axios.get(`https://meetapp-backend-1nm8.onrender.com/api/meet/user/${id}`);
          const data = await response.json();

          const { apiKey, token, userId } = data;
          const user = { id: userId };

          const streamClient = new StreamVideoClient({ apiKey, user, token });
          const streamCall = streamClient.call('default', 'first-call');

          setClient(streamClient);
          setCall(streamCall);

          // Join the call
          streamCall.join({ create: true });
        } catch (error) {
          console.error('Error fetching credentials:', error);
        }
      }
    };

    fetchCredentials();
  }, [user]);
  
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <SpeakerLayout />
          <CallControls />
          <PaginatedGridLayout/>
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};

export default Meet;

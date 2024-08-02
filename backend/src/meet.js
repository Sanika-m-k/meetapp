const { StreamClient, UserObjectRequest } = require('@stream-io/node-sdk');

// or
// const { StreamClient } = require("@stream-io/node-sdk");
const express = require('express');
const mongoose = require('mongoose');

const meetRouter = express.Router();


meetRouter.get('/user/:userid', async (req, res) => {
  try {
    const userid = req.params.userid;
    console.log(userid);
    const apiKey = 'qvam6pa3t95k';
const secret = 'p7d46u23bdgfdacyvajn4fp5xaf7rt7n7h5mdrgyxaavn5kxbg98n6cxdvpvhkmd';
client = new StreamClient(apiKey, secret);

// optionally add timeout to API requests
// the default timeout is 3000ms
client = new StreamClient(apiKey, secret, { timeout: 3000 });

const setupClient = async () => {
  const userId = userid;
  const newUser = {
    id: userId,
    role: 'user',
    custom: {
      color: 'red',
    },
    name: userid,
  };

  await client.upsertUsers({
    users: {
      [newUser.id]: newUser,
    },
  });

  // exp is optional (by default the token is valid for an hour)
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const token=client.createToken(userId, exp);

  const callType = 'default';
  const callId = 'my-first-call';
  const call = client.video.call(callType, callId);

  // optionally provide additional data
  await call.create({
    data: {
      created_by_id: userId,
      // Call members need to be existing users
      members: [{ user_id: userId, role: 'admin' }, { user_id: 'jack' }],
      custom: {
        color: 'blue',
      },
    },
  });

  console.log("api:" ,apiKey, token, userId)    
res.json({ apiKey, token, userId });

};

setupClient().catch(console.error);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = meetRouter;
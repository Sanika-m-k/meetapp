import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://meetapp-backend-1nm8.onrender.com');

function Chats({ organizationCode, email, selectedMember }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const room = selectedMember ? `${organizationCode}_${selectedMember}` : organizationCode;

    // Emit an event to join a specific room
    socket.emit('joinRoom', room);

    // Listen for the initial set of messages for the room
    socket.on('initialMessages', (initialMessages) => {
      setMessages(initialMessages);
    });

    // Listen for new messages
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Listen for message deletions
    socket.on('messageDeleted', (id) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
    });

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      socket.emit('leaveRoom', room);
      socket.off('initialMessages');
      socket.off('message');
      socket.off('messageDeleted');
    };
  }, [organizationCode, selectedMember]);

  const sendMessage = () => {
    if (message.trim()) {
      const room = selectedMember ? `${organizationCode}_${selectedMember}` : organizationCode;
      
      // Update messages state immediately
      const newMessage = {
        text: message,
        email: email,
        organizationCode: room,
        timestamp: new Date().toISOString(), // Send timestamp to server
        _id: Date.now().toString(), // Temporary ID, should be replaced with server-generated ID
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  const deleteMessage = (id) => {
    fetch(`https://meetapp-backend-1nm8.onrender.com/api/chats/messages/${id}`, {
      method: 'DELETE',
    }).then(() => {
      socket.emit('deleteMessage', id);
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-midnight-blue p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h1 className="text-white text-2xl mb-4">Chat</h1>
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.email === email ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-4 rounded-lg ${
                msg.email === email ? 'bg-soft-blue text-white' : 'bg-white text-charcoal-gray'
              }`}
            >
              <div className="font-semibold">{msg.email}</div>
              <div>{msg.text}</div>
              <div className="text-sm text-gray-500">{formatTime(msg.timestamp)}</div>
              {msg.email === email && (
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="ml-2 text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none text-charcoal-gray"
        />
        <button
          onClick={sendMessage}
          className="bg-soft-blue text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chats;

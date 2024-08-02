import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import supabase from '../supabaseClient';

const AllocateTask = () => {
  const { name } = useParams();
  const [task, setTask] = useState({ description: '', dueDate: '', allocatedTime: '', assignedTo: [] });
  const [members, setMembers] = useState([]);
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
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`https://meetapp-backend-1nm8.onrender.com/api/organizations/${name}/members`);
        console.log('Fetched members:', response.data);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [name]);

  const handleAddTask = async () => {
    try {
      const taskData = {
        ...task,
        allocatedBy: user.email,
      };
      const response = await axios.post(`https://meetapp-backend-1nm8.onrender.com/api/organizations/${name}/tasks`, taskData);
      setTask({ description: '', dueDate: '', allocatedTime: '', assignedTo: [] });
      alert('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAssignedToChange = (e) => {
    const { options } = e.target;
    const selectedMembers = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedMembers.push(options[i].value);
      }
    }
    setTask((prevTask) => ({ ...prevTask, assignedTo: selectedMembers }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Allocate Task for {name}</h1>
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleTaskChange}
          className="w-full p-3 border border-blue-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleTaskChange}
          className="w-full p-3 border border-blue-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="time"
          name="allocatedTime"
          value={task.allocatedTime}
          onChange={handleTaskChange}
          className="w-full p-3 border border-blue-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          multiple
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleAssignedToChange}
          className="w-full p-3 border border-blue-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AllocateTask;

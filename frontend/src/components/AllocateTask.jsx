// src/pages/AllocateTask.jsx
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
        const response = await axios.get(`http://localhost:8080/api/organizations/${name}/members`);
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
      const response = await axios.post(`http://localhost:8080/api/organizations/${name}/tasks`, taskData);
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
    <div>
      <h1>Allocate Task for {name}</h1>
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleTaskChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleTaskChange}
      />
      <input
        type="time"
        name="allocatedTime"
        value={task.allocatedTime}
        onChange={handleTaskChange}
      />
      <select multiple name="assignedTo" value={task.assignedTo} onChange={handleAssignedToChange}>
        {members.map((member) => (
          <option key={member.email} value={member.email}>
            {member.name} ({member.email})
          </option>
        ))}
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AllocateTask;

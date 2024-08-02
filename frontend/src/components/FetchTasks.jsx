import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import supabase from '../supabaseClient';

const FetchTasks = () => {
  const { code } = useParams();
  const [organization, setOrganization] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newTask, setNewTask] = useState({ description: '', dueDate: '', allocatedTime: '' });

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        const user = session?.user;
        if (user) {
          const response = await axios.get(`http://localhost:8080/api/organizations/code/${code}`);
          setOrganization(response.data);
          setTasks(response.data.tasks);
          setIsAdmin(response.data.adminEmail === user.email);
        }
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    fetchOrganization();
  }, [code]);

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/organizations/${organization._id}/tasks`, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ description: '', dueDate: '', allocatedTime: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h1>Organization: {organization?.code}</h1>
      {isAdmin && (
        <div>
          <h2>Allocate Task</h2>
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <input
            type="time"
            value={newTask.allocatedTime}
            onChange={(e) => setNewTask({ ...newTask, allocatedTime: e.target.value })}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.description} - Due: {task.dueDate} - Allocated Time: {task.allocatedTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchTasks;

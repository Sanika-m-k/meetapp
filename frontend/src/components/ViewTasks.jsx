// src/pages/ViewTasks.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewTasks = () => {
  const { name } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/organizations/${name}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [name]);

  return (
    <div>
      <h1>Tasks for {name}</h1>
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

export default ViewTasks;

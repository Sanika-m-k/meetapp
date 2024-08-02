import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewTasks = () => {
  const { name } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://meetapp-backend-1nm8.onrender.com/api/organizations/${name}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [name]);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Tasks for {name}</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="text-sm mb-2">
              <span className="font-bold">{task.description}</span> - Due: {task.dueDate} - Allocated Time: {task.allocatedTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewTasks;

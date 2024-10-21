import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000';

const NewEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState({
    name: '',
    start: '',
    end: '',
    task: ''
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tasks/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchEventDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`${BASE_URL}/events/event/${id}`);
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      }
    };

    fetchTasks();
    fetchEventDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the header
        }
      };

      if (id) {
        await axios.put(`${BASE_URL}/event/${id}`, event, config);
      } else {
        await axios.post(`${BASE_URL}/event/add`, event, config);
      }
      navigate('/events'); // Navigate back to the event list
    } catch (error) {
      console.error(
        'Failed to save the event:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Event' : 'Create New Event'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="start">Start Date:</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={event.start}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end">End Date:</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={event.end}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="task">Select Task:</label>
          <select
            id="task"
            name="task"
            value={event.task}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a Task --</option>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.name}
                </option>
              ))
            ) : (
              <option disabled>No tasks available</option>
            )}
          </select>
        </div>
        <button type="submit">{id ? 'Update Event' : 'Create Event'}</button>
      </form>
    </div>
  );
};

export default NewEvent;

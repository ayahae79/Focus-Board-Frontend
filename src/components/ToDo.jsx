import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

const BASE_URL = "http://localhost:3000"

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks()
  }, [user])

  const getTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/myTasks/${user.id}`)
      setTasks(response.data.tasks)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    }
  }

  return (
    <div className="todoContainer">
      <h1 className="todoTitle">To-Do List</h1>

      <div className="todoTasks">
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task._id} className="todoTaskItem">
                <h3 className="todoTaskTitle">{task.name}</h3>
              </li>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default TaskList

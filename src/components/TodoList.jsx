import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../api'
import { useNavigate } from 'react-router-dom'

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState(null)
  const [editContent, setEditContent] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
  axios.get(`${API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTasks(res.data))
  }, [token, navigate])

  const addTask = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
  const res = await axios.post(`${API_URL}/api/tasks`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTasks([...tasks, res.data])
    setContent('')
  }

  const updateTask = async (id) => {
  const res = await axios.put(`${API_URL}/api/tasks/${id}`, { content: editContent }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTasks(tasks.map(t => t._id === id ? res.data : t))
    setEditId(null)
    setEditContent('')
  }

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTasks(tasks.map(t => t._id === id ? res.data : t))
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTasks(tasks.filter(t => t._id !== id))
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="todo-container">
      <div className="header">
        <h2>My To-Do List</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <form onSubmit={addTask} className="add-task-form">
        <input type="text" placeholder="Add new task..." value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            {editId === task._id ? (
              <>
                <input value={editContent} onChange={e => setEditContent(e.target.value)} />
                <button onClick={() => updateTask(task._id)}>Save</button>
                <button onClick={() => { setEditId(null); setEditContent(''); }}>Cancel</button>
              </>
            ) : (
              <>
                <button
                  className={`complete-circle ${task.completed ? 'checked' : ''}`}
                  onClick={() => toggleComplete(task._id, task.completed)}
                  aria-label={task.completed ? 'Mark as not completed' : 'Mark as completed'}
                >
                  {task.completed ? '✅' : ''}
                </button>

                <span className="task-content" onClick={() => toggleComplete(task._id, task.completed)}>{task.content}</span>

                {!task.completed && (
                  <button className="edit-btn" onClick={() => { setEditId(task._id); setEditContent(task.content); }}>Edit</button>
                )}

                <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList

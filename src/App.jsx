import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import TodoList from './components/TodoList.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<TodoList />} />
      </Routes>
    </Router>
  )
}

export default App

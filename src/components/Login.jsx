import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
  const res = await axios.post(`${API_URL}/api/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <p>Don't have an account? <a href="/register">Register</a></p>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Login

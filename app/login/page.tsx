'use client'

import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import api from '../api'

interface ErrorResponse {
  response: {
    data: {
      message: string
    }
  }
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  // TODO: handleLogin
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      const data = response.data

      if (response.status === 200) {
        localStorage.setItem('token', data.data.token) // save token to localStorage
        router.push('/home') // Navigate to home page after successful login
      } else {
        setError(data.message)
      }
    } catch (err) {
      const errorResponse = err as ErrorResponse
      if (errorResponse.response.data.message) {
        setError(errorResponse.response.data.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              style={{ backgroundColor: 'blue' }}
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              style={{ backgroundColor: 'blue' }}
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button style={{ backgroundColor: 'blue' }} type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

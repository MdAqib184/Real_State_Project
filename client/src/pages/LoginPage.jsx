import React, { useState } from 'react'
import "../styles/Login.scss"
import { setLogin } from '../redux/state'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
      const response = await fetch ("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok) {
        console.error("Error in login request:", response.statusText);
        // Handle the error appropriately
      }

      const loggedIn = await response.json()

      if(loggedIn){
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }
    }
    catch (err){
      console.log("Login Failed", err.message)
    }
  }
  return (
    <div className='login'>
      <div className='login_content'>
        <form className='login_content_form' onSubmit={handleSubmit}>
          <input type="email" placeholder='Email Id' 
            required value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder='Password' 
            required value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>LOGIN</button>
        </form>
        <a href="/register">Don't have an account? Sign In</a>
      </div>
    </div>
  )
}

export default LoginPage

import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {
    
    const navigate=useNavigate()
    const [details,setDetails]=useState({
        email:"",
        password:"",        
    })

    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")

    const handleChange=(e)=>{
        const {name,value}=e.target
        setDetails((prev)=>({
            ...prev,
            [name]:value
        }))
    }
   

    const handleSubmit=async (e)=>{
        e.preventDefault()
        setLoading(true)
        setError("")
        try {   
            const response=await axios.post('https://todo-list-7226.onrender.com/api/users/login',details,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials:true

                }
            )
            console.log(response.data)
            navigate('/home')
        } catch (error) {
            setError(`${error.message}`)
        }
        finally{
            setLoading(false)
            
        }        

    }
        
    return (
       
        <>
            <div className="wrapper">
                <div className="loginContainer">
                    <div id ="loginHeading">Log In!!</div>
                    <form id="loginForm">
                        
                        <input type="email" id="email" name="email" placeholder="Email" value={details.email} onChange={handleChange}/>
                        
                        <input type="password" id="password" name="password" placeholder="Password" value={details.password} onChange={handleChange}/>
                    </form>
                    <button id="loginButton" onClick={handleSubmit} disabled={loading}>{loading?"Logging in...":"Submit"}</button>
                </div>
            </div>
        </>
    )
}

export default Login;   
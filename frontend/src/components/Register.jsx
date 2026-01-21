import { useState } from "react"
import { useNavigate } from "react-router-dom"


import './Register.css'
import  registerLogo from '../assets/todoListImage.jpg'
function Register()
{
    const navigate=useNavigate()
    const [details,setDetails]=useState({
        username:"",
        email:"",
        password:"",        
    })

    const handleChange=(e)=>{
        const {name,value}=e.target
        setDetails((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        try {
            console.log("Button clicked!!")
            await axios.post('https://todo-list-7226.onrender.com/api/users/register',details,
                {
                        withCredentials:true
                    }
            )
            console.log("Succesfully registered!!!",details)
            navigate('/login')
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    return(
        <>
            <div id="wrapper">                
                <div id="registerContainer">
                    <div id ="loginHeading">Register</div>
                    <form id="registerForm">
                        
                        <input type="text" id="username" name="username" value={details.username} placeholder="Username:" onChange={handleChange}></input>
                        <input type="email" id="email" name="email" placeholder="Email" value={details.email} onChange={handleChange}/>                        
                        <input type="password" id="password" name="password" placeholder="Password" value={details.password} onChange={handleChange}/>
                        
                    </form>
                    <button id="registerButton" onClick={handleSubmit}>Register</button>
                </div>
                <div id="imageContainer">
                    <img src={registerLogo} height={400} width={400}></img>
                </div>
            </div>
        </>
    )
}

export default Register
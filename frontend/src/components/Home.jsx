import TaskList from "./TaskList.jsx"
import './Home.css'
import axiosInstance from "../utils/refresh.js"
import { useNavigate } from "react-router-dom"

function Home(){

    const navigate=useNavigate()
    const logOut=async()=>{
        const response=await axiosInstance.post('/users/logout')
        if(response.data.success===true)
            navigate('/')
    }   
    return(
        <>
            <div id="wrapper">
                <div id="features">
                    <button id="logoutButton" onClick={()=>logOut}>Logout</button>
                    <TaskList/>                     
                </div>
                
            </div>            
        </>
    )    
}

export default Home
import axios from "axios"


export const refreshAccessToken=async ()=>{
  try {
    const response=await axios.post("https://todo-list-7226.onrender.com/api/users/refresh-token")
  } catch (error) {
    
  }
}
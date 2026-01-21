
    import axios from "axios"
    import { useEffect, useState } from "react"
    import Task from "./Task.jsx"

    import './TaskList.css'
    import TaskPopup from "./TaskPopup.jsx"


    function TaskList(){
        
        const [tasks,setTasks]=useState([])
        const [isPopupOpen,setPopupOpen]=useState(false)
        const [selected,setSelected]=useState({})

        useEffect(()=>{
            fetchTask()
        },[])
        
        const fetchTask=async()=>{
            try {
                const response=await axios.get('/api/users/get-user-task')
                setTasks(response.data.data.tasks)
            } catch (error) {
                console.log(error)
                throw error            
            }
        }

        const handleAdd=()=>{
            console.log("The popup is working.Its value is ",isPopupOpen)
            setPopupOpen(true)
        }


        const setStatus=(status)=>{
            if(status===false)
                return "Pending"
            else
                return "Completed"
        }

        const taskColor=(priority)=>{
            if(priority===1){
                return "rgba(242, 2, 2, 0.778)"
            }
            else if(priority===2){
                return "rgba(0, 128, 0, 0.767)"
            }
            else if(priority===3){
                return "rgba(255, 255, 0, 0.763)"
            }
        }

        const saveTasks=async(task)=>{
            try{
                console.log(task)
                const response=await axios.post('/api/tasks/addTask',task)
                fetchTask()

            }
            catch(error){
                console.log(error)
                throw(error)
            }
            finally{
                setPopupOpen(false)
            }
            
            
        }

        const closeTask=()=>{
            setPopupOpen(false)
        }

        const selectTask=(taskId)=>{
            setSelected((prev)=>({
                ...prev,
                [taskId]:!prev[taskId]
            }))
        }

       

        const handleDelete=async()=>{
            const selectedTaskIds = Object.keys(selected).filter(id => selected[id])
            if (selectedTaskIds.length === 0) {
                alert("Please select at least one task to delete")
                return
            }

            try{
                await Promise.all(
                    selectedTaskIds.map((taskId)=>
                    axios.delete(`/api/tasks/deleteTask/${taskId}`)
                    )
                )
                
                fetchTask()
                setSelected({})
            }
            catch(error)
            {
                console.log(error)
            }
            
        }

        return(
            <>
            <div id="mainContainer">
                <div id="taskHeading">Task Manager</div>
                <div id="taskScreen">{
                    (tasks.length===0)?(
                        <div id="noTasks">No tasks currently</div>
                    ):(
                        <div id="taskListContainer">    
                            {tasks.map((task)=>(
                                <Task key={task._id} taskTitle={task.title} taskDescription={task.description} taskStatus={setStatus(task.status)} color={taskColor(task.priority)} isSelected={selected[task._id]} onSelect={()=>selectTask(task._id)}/>
                            ))} 
                        </div>  
                    )       
                }</div>
                <div id="taskButtons">
                    <button id="addButton" onClick={handleAdd}>Add</button>
                    <button id="deleteButton" onClick={handleDelete}>Delete</button>
                </div>
            </div>

            <TaskPopup isOpen={isPopupOpen} onSave={saveTasks} onClose={closeTask}/>
            
            </>
        )
    }


    export default TaskList
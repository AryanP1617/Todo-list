import { useState} from 'react'
import './TaskPopup.css'

function TaskPopup({isOpen,onSave,onClose}){

    const [priority,setPriority]=useState(3)
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")

    
    
    if(!isOpen)
        return null
    
    
    const handleSubmit=(e)=>{
        
        const taskData={
            title,
            description,
            priority
        }
        onSave(taskData)

        setTitle("")
        setDescription("")
        setPriority(3)
    }

    return(
        <>
            <div id="popupOverlay">
                <div id="popupContent">
                    <div id="popupText">
                        <div id="popupTitle">
                            <h4 id="popupTaskTitle">Enter a task</h4>
                            <input type='text' id='inputTaskTitle' name='inputTaskTitle'   placeholder='Enter title of task' value={title} onChange={(e)=>setTitle(e.target.value)}></input> 
                        </div>
                        <div id="popupDescription">
                            <h4 id="popupTaskDescription">Enter description</h4>
                            <input type='text' id='inputTaskDescription' name='inputTaskDescription'  placeholder='Enter description of task' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
                        </div>
                         <div id="popupPriority">
                            <div id ="popupPriorityButtons">
                                <h4>Select priority</h4>
                                <input type='radio' name='priority' id='redButton'value={1} checked={priority===1} onChange={()=>setPriority(1)} ></input>
                                <input type='radio' name='priority' id='greenButton' value={2}checked={priority===2} onChange={()=>setPriority(2)}></input >
                                <input type='radio' name='priority' id='yellowButton'value={3} checked={priority===3} onChange={()=>setPriority(3)}></input>
                            </div>
                        </div>
                        <div id="popupActions">
                            <button id='popupSubmit' onClick={handleSubmit}>Submit</button>
                            <button id='popupClose' onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                    
                       
                        

                    
                </div>
            </div>
        </>
    )
}

export default TaskPopup
import './Task.css'


function Task({taskTitle,taskDescription,taskStatus,color,isSelected,onSelect}){
    const title=taskTitle
    const description=taskDescription
    const status=taskStatus   

    const setColor=()=>{
        if(isSelected)
            return "rgba(255, 255, 255, 0.53)"
        
        return "white"
    }

    return(
        <>
            <div id="taskBox" onDoubleClick={()=>onSelect()} style={{backgroundColor:setColor()}}>
                <div id="taskData">
                    <div id="taskTitle">{title}</div>
                    <div id="taskDescription">{description}</div>
                </div>
                <div id="taskInfo">
                    <div id="taskPriority">
                        <input type="radio" id="priorityButton" name="priorityButton" style={{backgroundColor:color}}></input>
                    </div>
                    <div id="taskStatus">{status}</div>
                </div>
            </div>
        </>       
    )
}

export default Task
import { useState, useEffect } from "react"
import "./style.css"


export default function AddTask(props) {

    const [task, setTask] = useState({ id: 0, userId: 0, title: '', completed: false })



    const Add = () => {
        if (task.title.trim() != '') {
            props.setShowAddTask(false)
            props.setIsChangedB(true)
            props.setTasksList([...props.tasksList, task])
            
        }
    }


    return (
        <div style={{ textAlign: 'left' }}>
            <h3>Add Task:</h3>
            Title: <input type="text" onChange={(e) => setTask({ ...task,id:props.newTaskId, userId: props.userId, title: e.target.value, completed: false  })} /><br />
            <button style={{ marginLeft: '200px', marginTop:'5px', padding:'5px', backgroundColor:'lightgray' }}onClick={()=>props.setShowAddTask(false)}>Cancle</button>
            <button style={{  padding:'5px', backgroundColor:'lightgoldenrodyellow' }} onClick={Add}>Add</button>
        </div>
    )
}
import { useState, useEffect } from "react"

export default function Tasks(props) {

    const [task, setTask] = useState({})

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        setTask(props.taskData)
    }
    const update = () => {
        setTask({ ...task, completed: true })
        // props.setCompletedB(!props.completedB)
        props.setIsChangedB(true)
        let newTasks = [...props.tasksList]
        for(let i = 0; i<newTasks.length; i+=1){
            if(newTasks[i].id==task.id){
                newTasks[i].completed=true
                break
            }
        }    
        props.setMainToDos([...props.mainToDos, newTasks])    
        props.setTasksList([...newTasks])
    }

    return (
        <div style={{textAlign: 'left', border: "2px solid green", padding:'10px' }} >
            <b>Title: </b>{task.title}.<br /><br />
            <b>Completed: </b>{task.completed ? 'true' : 'false'}. &nbsp;  &nbsp;  &nbsp; 
            <button style={{ bottom: 'right' }} hidden={task.completed} onClick={update}>Mark Completed</button><br />

        </div>
    )
}
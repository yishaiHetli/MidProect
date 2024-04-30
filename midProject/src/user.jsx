import { useState, useEffect } from "react"
import { getPostsById } from "./service"
import Tasks from "./tasks"
import Post from "./posts"
import AddTask from "./addTask"
import AddPost from "./addPost"

export default function User(props) {

    // const [user, setUser] = useState({ id: 0, name: '', email: '', address: { street: '', city: '', zipcode: 0 } })
    const [user, setUser] = useState({})
    const [showMoreData, setShowMoreData] = useState(false)
    //a flag sent to the Tasks component to indicate a change so that the useEffect ([tasks]) will not run on the first lode
    const [isChanged, setIsChanged] = useState(false)
    // a flag that indicate if all the tasks are completed
    const [completed, setCompleted] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)
    const [showAddPost, setShowAddPost] = useState(false)
    const [tasks, setTasks] = useState([])
    const [posts, setPosts] = useState([])


    useEffect(() => {
        getData()
    }, [props.mainToDos])

    useEffect(() => {
        setUser(props.userData)
    }, [props.userData])


    const getData = async () => {
        const temp = props.mainToDos.filter((task)=>task.userId==props.userData.id)
        setTasks(temp)
        if (!isChanged) {
            setCompleted(true)
            for (const item of temp) {
                if (!item.completed) {
                    setCompleted(false)
                }
            }
            const response = await getPostsById(props.userData.id)
            setPosts(response)
            sessionStorage.setItem('tasks${props.userData.id}', JSON.stringify(response))
        }
    }

    useEffect(() => {
        if (isChanged) {
            setCompleted(true)
            for (const item of tasks) {
                if (!item.completed) {
                    setCompleted(false)
                }
            }
        }
    }, [tasks])

    const update_user = () => {
        if (user.name.trim() != '' && user.email.trim() != '') {
            props.setUserB(user)
            props.setChanged(true)
            alert("user updated successfuly")
        }
    }

    const deleteUser = () => {
        props.setChanged(true)
        let newUserList = [...props.userList]
        for (let i = 0; i < newUserList.length; i += 1) {
            if (newUserList[i].id == user?.id) {
                newUserList.splice(i, 1)
                break
            }

        }
        props.setUsersB(newUserList)

        let newSearchList = [...props.searchListB]

        for (let i = 0; i < newSearchList.length; i += 1) {
            if (newSearchList[i].id == user?.id) {
                newSearchList.splice(i, 1)
                break
            }

        }
        props.setSearchListB(newSearchList)
    }

    const onIdClick = () => {
        props.setShowAddUserB(false)
        props.setPresentorId(user.id)

    }

    return (
        <div className="content">
            <div className="parent">

                <div style={{ textAlign: 'left', border: completed ? "3px solid green" : "3px solid red", backgroundColor: user.id == props.presentorId ? 'lightpink' : '' }}>
                    &nbsp; <span onClick={onIdClick}> Id: {props.userData.id}</span><br />
                    &nbsp;   Name: <input style={{ backgroundColor: 'inherit' }} type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} /><br />
                    &nbsp;   Email: <input style={{ backgroundColor: 'inherit', marginLeft: '2.5px' }} type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /><br />
                    &nbsp;   <button style={{ backgroundColor: 'lightgray', marginRight: '60px', marginBottom: '5px', marginTop: '5px', padding: '10px' }}
                        onMouseOver={() => setShowMoreData(true)} onClick={() => setShowMoreData(false)}>other data</button>
                    <button style={{ backgroundColor: 'lightgoldenrodyellow', padding: '8px' }} onClick={update_user}>Update</button>
                    <button style={{ backgroundColor: 'lightgoldenrodyellow', padding: '8px' }} onClick={deleteUser}>Delete</button>
                    {showMoreData && <div style={{ border: '2px solid black', borderRadius: '10px', backgroundColor: 'lightgray', textAlign: 'left', alignItems: 'end' }}>

                        &nbsp; &nbsp;Street:<input style={{ backgroundColor: 'inherit', marginLeft: '16.5px' }} type="text" defaultValue={user.address?.street} onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })} /><br />
                        &nbsp; &nbsp;City: <input style={{ backgroundColor: 'inherit', marginLeft: '25.5px' }} type="text" defaultValue={user.address?.city} onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })} /><br />
                        &nbsp; &nbsp;Zipcode: <input style={{ backgroundColor: 'inherit' }} type="text" defaultValue={user.address?.zipcode} onChange={(e) => setUser({ ...user, address: { ...user.address, zipcode: e.target.value } })} /><br />

                    </div>}
                    {user.id == props.presentorId && !showAddTask && <div >
                        <ul id="task" className='child' style={{ width: '320px', padding: '10px', border: "2px solid black" }}>
                            <span style={{ marginRight: '190px' }} >ToDos-User {user.id}</span>
                            <button style={{ backgroundColor: 'lightgoldenrodyellow', float: 'inline-end' }} onClick={() => setShowAddTask(true)}>Add</button>
                            <ul style={{ marginTop: '10px', float: 'inline-end', padding: '0px', paddingLeft: '0px', paddingRight: '40px', width: '280px', maxHeight: '300px', overflowY: 'auto', overflowX: 'clip', listStyleType: 'none' }}>
                                {tasks?.map((task, index) => <li key={index} style={{ width: '280px', margin: '10px' }}><Tasks taskData={task} tasksList={tasks}
                                    setMainToDos={props.setAllToDos} mainToDos={props.mainToDos} setTasksList={setTasks} setIsChangedB={setIsChanged} /></li>)}
                            </ul>
                        </ul>
                    </div>}

                    {user.id == props.presentorId && !showAddPost && <div >
                        <ul id="post" className='child' style={{ width: '320px', padding: '10px', border: "2px solid black" }}>
                            <span style={{ marginRight: '190px' }} >Posts-User {user.id}</span>
                            <button style={{ backgroundColor: 'lightgoldenrodyellow', float: 'inline-end' }} onClick={() => setShowAddPost(true)}>Add</button>
                            <ul style={{ marginTop: '10px', float: 'inline-end', padding: '0px', paddingLeft: '0px', paddingRight: '40px', width: '280px', maxHeight: '300px', overflowY: 'auto', overflowX: 'clip', listStyleType: 'none' }}>
                                {posts?.map((post, index) => <li key={index} style={{ width: '280px', margin: '10px' }}><Post postData={post} /></li>)}
                            </ul>
                        </ul>
                    </div>}

                    {showAddTask && user.id == props.presentorId && !props.showAddUserB && <div >
                        <ul id="task" className='child' style={{ listStyleType: 'none', padding: '10px', border: "2px solid black" }}>
                            <AddTask userId={user.id} setShowAddTask={setShowAddTask} tasksList={tasks} setIsChangedB={setIsChanged}
                                setTasksList={setTasks} newTaskId={Math.max(...tasks.map(o => o.id)) + 1} />
                        </ul>
                    </div>}

                    {showAddPost && user.id == props.presentorId && !props.showAddUserB && <div >
                        <ul id="post" className='child' style={{ listStyleType: 'none', padding: '10px', border: "2px solid black" }}>
                            <AddPost userId={user.id} setShowAddPostB={setShowAddPost} postList={posts}
                                setPostsList={setPosts} newPostId={Math.max(...posts.map(o => o.id)) + 1} />
                        </ul>
                    </div>}
                </div>

            </div>
        </div>
    )
}
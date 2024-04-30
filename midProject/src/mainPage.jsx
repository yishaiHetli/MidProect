import { getTodos, getUsers } from "./service"
import { useState, useEffect } from "react"
import User from "./user"
import AddUser from "./addUser"
import "./style.css"

export default function MainPage() {

    const [users, setUsers] = useState([])
    const [toDos, setToDos] = useState([])
    const [user, setUser] = useState()
    //a flag used to show the AddUser component and to User component to indicate a change in user list
    const [isChanged, setIsChanged] = useState(false)
    //a flag used to show the AddUser component and sent to the Tasks component to close if tasks is visible
    const [showAddUser, setShowAddUser] = useState(false)
    //a sent to the User component to show tasks and useed here to close tasks if AddUser component is visible
    const [showTasks, setShowTasks] = useState(false)
    //a veriable sent to the User component to indicate which user showing it's tasks list
    const [id, setId] = useState(0)
    const [searchList, setSearchList] = useState([])
    const [isSearching, setIsSearching] = useState(0)
    const [searchValue, setSearchValue] = useState('')


    const getData = async () => {
        const resp = await getUsers()
        setUsers(resp)
        setSearchList(resp)

        for (const item of resp) {
            sessionStorage.setItem(item.id, JSON.stringify(item))
        }
        const responce = await getTodos()
        setToDos(responce)
    }

    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        if (isChanged) {
            let newUsers = [...searchList]
            for (let i = 0; i < newUsers.length; i += 1) {
                if (newUsers[i].id == user?.id) {
                    newUsers[i] = user
                    sessionStorage.setItem(user.id, JSON.stringify(user))
                    break
                }
            }
            setUsers(newUsers)
            setSearchList(newUsers)
            if (isSearching) {
                setUsers(newUsers.filter((item) => item.name.substring(0, isSearching) == searchValue))
            }
        }
    }, [user])


    const addUser = () => {
        setShowAddUser(true)
        setId(0)
    }

    const search = (e) => {
        setIsSearching(e.target.value.length)
        setSearchValue(e.target.value)
        setUsers(searchList.filter((item) => item.name.substring(0, e.target.value.length) == e.target.value))
        if (e.target.value.length == 0) {
            setIsSearching(false)
            setUsers(searchList)
        }
    }

    return (
        <div id="content" >
            <div id="parent" >
                <div id="right" className="child" hidden={!showAddUser} style={{ border: "2px solid black"}}>
                    <AddUser setChanged={setIsChanged} setNewUser={setUser} newUserId={Math.max(...searchList.map(o => o.id)) + 1}
                        setShowTasksB={setShowTasks} setSearchListB={setSearchList} usersList={users} setUsersList={setUsers} setShowAddUserB={setShowAddUser} />
                </div>

                <ul id="left" className="child" style={{ textAlign:'left',listStyleType: 'none', padding: '10px',  borderRadius: '15px' }}>
                &nbsp;&nbsp;&nbsp;search: <input type="text" onChange={search} />
                    <button style={{ backgroundColor: 'lightgoldenrodyellow', float:'inline-end', marginRight:"10px", borderRadius: '7px' }} onClick={addUser}>Add</button>
                    {users?.map((user, index) => <li style={{ margin: '10px' }} key={index} > <User searchListB={searchList} setSearchListB={setSearchList} 
                    setUsersB={setUsers} userList={users} setPresentorId={setId} presentorId={id} setChanged={setIsChanged} userData={user} showAddUserB={showAddUser}
                        setUserB={setUser} isChangedP={isChanged} mainToDos={toDos} setAllToDos={setToDos} setShowAddUserB={setShowAddUser} /> </li>)}
                </ul>

            </div>
        </div>
    )
}
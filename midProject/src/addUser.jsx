import { useState, useEffect } from "react"
import "./style.css"


export default function AddUser(props) {
    const [user, setUser] = useState({ id: props.newUserId, name: '', email: '' })

    const Add = () => {
        if (user.name.trim() != '' && user.email.trim() != '') {
            sessionStorage.setItem(props.newUserId, JSON.stringify(user))
            props.setShowAddUserB(false)
            props.setChanged(true)
            props.setUsersList([...props.usersList, user])
            props.setSearchListB([...props.usersList, user])
        } 
    }


    return (
        <div style={{ textAlign: 'left' }}>
            <h3>Add User:</h3>
            Name: <input type="text" onChange={(e) => setUser({ ...user, id: props.newUserId > 0 ? props.newUserId : 1, name: e.target.value })} /><br />
            Email: <input type="text" onChange={(e) => setUser({ ...user, email: e.target.value })} /><br />
            <button style={{ marginLeft: '260px' }} className={"leftText"} onClick={Add}>Add</button><br />
        </div>
    )
}
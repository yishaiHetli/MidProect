import { useEffect, useState } from "react"
import { getTodosById, getUsers} from "./service"
import MainPage from "./mainPage"

export default function Users() {

    const [users, setUsers] = useState([])


    const getData = async () => {
        const resp = await getUsers()
        setUsers(resp)
      
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <MainPage userLisr={users} setUserList={setUsers} />
        </div>
    )
}
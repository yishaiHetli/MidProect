import axios from "axios";

const usersUrl = 'https://jsonplaceholder.typicode.com/users'
const todosUrl = 'https://jsonplaceholder.typicode.com/todos'
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'


export const getUserById = async (id) => {
    const { data } = await axios.get(`${usersUrl}/${id}`)
    return data
}

export const getUsers = async () => {
    const { data } = await axios.get(`${usersUrl}`)
    return data

}

export const getTodosById = async (userId) => {
    const { data } = await axios.get(`${todosUrl}?userId=${userId}`)
    return data

}

export const getTodos = async () => {
    const { data } = await axios.get(`${todosUrl}`)
    return data

}


export const getPostsById = async (userId) => {
    const { data } = await axios.get(`${postsUrl}?userId=${userId}`)
    return data

}

export const update_user = async (id, user) => {
    const { data } = await axios.put(`${usersUrl}/${id}`, user)
    return data

}
import { useState, useEffect } from "react"

export default function Post(props) {

    const [post, setPost] = useState({})

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        setPost(props.postData)
    }


    return (
        <div style={{ textAlign: 'left', border: "2px solid green", padding:'10px' }} >
            <b>Title: </b>{post.title}.<br /><br />
            <b>Body: </b>{post.body}. &nbsp;  &nbsp;  &nbsp; 

        </div>
    )
}
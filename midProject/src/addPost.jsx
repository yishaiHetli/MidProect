import { useState } from "react"
import "./style.css"


export default function AddPost(props) {

    const [post, setPost] = useState({ id: 0, userId: 0, title: '', body: '' })



    const Add = () => {
        if (post.title.trim() != '' && post.body.trim() != '') {
            props.setShowAddPostB(false)
            props.setPostsList([...props.postList, post])

        }
    }


    return (
        <div style={{ textAlign: 'left'}}>
            <h3>Add Post:</h3>
            Title: <input style={{marginLeft:'10px'}} type="text" onChange={(e) => setPost({ ...post, id: props.newPostkId, userId: props.userId, title: e.target.value })} /><br />
            Body: <input style={{marginLeft:'5px'}} type="text" onChange={(e) => setPost({ ...post, body: e.target.value })} /><br />
            <button style={{ marginLeft: '200px', marginTop:'5px', padding:'5px', backgroundColor:'lightgray' }} onClick={() => props.setShowAddPostB(false)}>Cancle</button>
            <button style={{  padding:'5px', backgroundColor:'lightgoldenrodyellow' }} onClick={Add}>Add</button>
        </div>
    )
}
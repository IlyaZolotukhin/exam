import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {User} from "./Login";
import {Button, Input, Container} from "./Home";

interface PostProps {
    user: User | null;
}

interface Post {
    id: number
    title: string
    body: string
    userId: number
}

export const PostLists: React.FC<PostProps> = ({user}) => {
    const [posts, setPosts] = useState<Post>();
    const [text, setText] = useState<string>('');

    const sendMessage = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: text,
                body: user?.username,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch(error => console.error(error));
        setText('')
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <Container>
            <h2>Posts</h2>
            <Input type="text" value={text} onChange={handleTextChange}/>
            <Button onClick={sendMessage}>Send Post</Button>
            {posts ? <p><b>{posts.body}:</b> {posts.title} </p> : <div>empty post</div>}
        </Container>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
    };

    const addPost = async () => {
        const response = await axios.post('http://localhost:5000/api/posts', {
            userId: '64b9b1b1b1b1b1b1b1b1b1b1', // Replace with actual user ID
            content,
            likes: 0,
            comments: [],
        });
        setPosts([...posts, response.data]);
        setContent('');
    };

    return (
        <div>
            <h1>Social Media Platform</h1>
            <div>
                <textarea
                    placeholder="Write a post..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={addPost}>Post</button>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <p>{post.content}</p>
                        <p>Likes: {post.likes}</p>
                        <p>Comments: {post.comments.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
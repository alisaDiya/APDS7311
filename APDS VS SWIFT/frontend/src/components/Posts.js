import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://localhost:3000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    };
    fetchPosts();
  }, [token]);

  const handleCreatePost = async () => {
    try {
      await axios.post('https://localhost:3000/api/posts', { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post created successfully');
      setTitle(''); 
      setContent(''); 
      
    } catch (error) {
      console.error('Error creating post:', error.response.data);
      alert(`Error creating post: ${error.response.data.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreatePost}>Create Post</button>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}: {post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

import React, { useEffect, useState } from 'react';
import Post from './Post.jsx';

export default function Feed(props) {
  
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [props.topic]);

  const fetchPosts = () => {
    fetch(`/api/getTopic/${props.topic}`)
      .then((res) => res.json())
      .then((data) => {
        setCodeBlocks(data);
      })
      .catch((err) => console.log(err));
  };

  const postsToRetrieve = codeBlocks.map(post => {
    return <Post key={post._id} code={post.code} />;
  });

  return (
    <div>
      <div>{postsToRetrieve}</div>
    </div>
  );
}
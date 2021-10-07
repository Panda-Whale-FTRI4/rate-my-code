import React, { useEffect, useState } from 'react';
import Post from './Post.jsx';
import { Link } from 'react-router-dom';
import classes from './Feed.module.css';
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
    return <Post 
      key={post._id} 
      postId={post._id} 
      code={post.code} 
      setPostToRender={props.setPostToRender} 
      title={post.title} 
      username={post.username} 
      date={post.date} 
      issue={post.issue}
    />;
  });
  return (
    <div className={classes.postContainer}>
      {postsToRetrieve}
    </div>
  );
}
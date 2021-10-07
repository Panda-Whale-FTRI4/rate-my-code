import { ClassNames } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import classes from './PostView.module.css';

export default function PostView (props) {
  
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);


  useEffect(() => {
    fetchPost();
  }, [props.postToRender]);

  const fetchPost = () => {
    console.log('hitting fetch');
    fetch(`/api/getPost/${props.postToRender}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data?.posts);
        setComments(data?.comments);
      })
      .catch((err) => console.log(err));
  };

  return (
    
    <div className={classes.container}>
      <div className={classes.post}>
        <h2 className={classes.title}>{post?.title}</h2>
        <div className={classes.issue}>
          <h3>Issue:  </h3>
          {post?.issue}
        </div>
        <div className={classes.code}>
          <h3>Code:  </h3> 
          {post?.code}
        </div>
        <div>{post?.username}</div>
      </div>
      <div className={classes.votes}>
        <div className={classes.upvotes}>Upvotes: {post?.downvotes}</div>
        <div className={classes.downvotes}>Downvotes: {post?.upvotes}</div>
      </div>
      <div className={classes.comments}> 
        <h3 className={classes.commentTitle}>Comments</h3>
        <div>Comment1</div>
        <div>Comment2</div>
      </div>
      
    </div>
  );
}

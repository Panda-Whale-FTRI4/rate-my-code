import React, { useEffect, useState } from 'react';

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
        setPost(data?.post);
        setComments(data?.comments);
      })
      .catch((err) => console.log(err));
  };
  const array = ['hello', 'how are you']  ;
  

  return (
    <div>
      {console.log(comments[0])}
      {console.log(array)}

      
      {/* <div>{post?.title}</div>
      <div>{post?.issue}</div> */}
      <div>{comments}</div>
    </div>
  );
}

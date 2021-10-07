import React, { useEffect, useState } from 'react';

export default function PostView (props) {
  const [post, setPost] = useState('this post state is empty');

  useEffect(() => {
    fetchPost();
  }, [props.postToRender]);

  const fetchPost = () => {
    fetch(`api/getPost/${props.postToRender}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {post}
    </div>
  );
}

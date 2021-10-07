import React, { useEffect, useState } from 'react';

export default function PostView (props) {

  const [post, setPost] = useState('this post state is empty');

  useEffect(() => {
    fetchPost();
  }, [props.postToRender]);

  const fetchPost = () => {
    console.log('hitting fetch');
    fetch(`/api/getPost/${props.postToRender}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=''>
      {post.posts?.title}
      {post.posts?.issue}
    </div>

    <div>

    </div>
  );
}

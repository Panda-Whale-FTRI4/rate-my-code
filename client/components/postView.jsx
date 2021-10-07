import React, { useEffect, useState } from 'react';

export default function PostView (props) {

  const [post, setPost] = useState('Some text thats apparently essential');

  useEffect(() => {
    fetchPost();

  }, []);

  const fetchPost = () => {
    fetch(`/api/getPost/${props.postToRender}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch((err) => console.log(err));
  };

  const commentsToRender = [];

  // post?.comments.forEach(comment => {
  //   commentsToRender.push(
  //     '<div key={comment._id} id="commentUsername">{comment.username}</div>'
  //   );
  // });

  for (let i = 0; i < post?.comments.length; i++) {
    commentsToRender.push('<div key={comment._id} id="commentUsername">{comment.username}</div>');
  }
  // const commentsToRender = post.map(comment => {
  //   console.log('Comments: ', comment);
  //   return(
  //     '<div key={comment._id} id="commentUsername">{comment.username}</div>'
  //   );
  // });

  return (
    <div>
      <div className='postContent'>
        <div id="postTitle">
          {post.posts?.title}
        </div>
        <div id="postUsername">
          {post.posts?.username}
        </div>
        <div id="postIssue">
          {post.posts?.issue}
        </div>
        <div id="postCode">
          <div id="codepen"></div>
          <h3>Codepen Below</h3>
          <div
            className="codepen"
            data-prefill
            data-height="400"
            data-default-tab="html,result"
            data-editable>
            <pre data-lang="js">
              <code>
                {post.posts?.code}
              </code>
            </pre>
          </div>
          <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
        </div>
      </div>
      <div className='postVotes'>
        <div id="postUpvotes">
          {post.posts?.upvotes}
          <button id="upvoteBtn">+</button>
        </div>
        <div id="postDownvotes">
          {post.posts?.downvotes}
          <button id="downvoteBtn">-</button>
        </div>
      </div>

      {/* <div className='comments'>
        {post.comments.map(comment => {
          return '<div key={comment._id} id="commentUsername">{comment.username}</div>';
        })}
      </div> */}

      <div className='comments'>
        {commentsToRender}
      </div>
    </div>
  );
}

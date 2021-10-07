import React, { useEffect, useState } from 'react';

export default function PostView (props) {
  
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);


  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = () => {
    fetch(`/api/getPost/${props.postToRender}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data?.posts);
        setComments(data?.comments);
      })
      .catch((err) => console.log(err));
  };  


  const commentsDivs = comments.map(comment => {
    return (
      <div key={comment._id}>
        <div>{comment.username}</div>
        <div>{comment.comment}</div>
      </div>
    );
  });

  return (
    <div>
      <div className='postContent'>
        <div id="postTitle">
          {post?.title}
        </div>
        <div id="postUsername">
          {post?.username}
        </div>
        <div id="postIssue">
          {post?.issue}
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
                {post?.code}
              </code>
            </pre>
          </div>
          <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
        </div>
      </div>
      <div className='postVotes'>
        <div id="postUpvotes">
          {post?.upvotes}
          <button id="upvoteBtn">+</button>
        </div>
        <div id="postDownvotes">
          {post?.downvotes}
          <button id="downvoteBtn">-</button>
        </div>
      </div>

      <div className='comments'>
        {commentsDivs}
      </div>
    </div>
  );
}

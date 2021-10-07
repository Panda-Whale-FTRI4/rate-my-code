import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Post.module.css';

export default function Post(props) {
  return (
    <section>
        {console.log('Posts.jsx: ', props)}
      <Link to={'/home/postview/'}>
        {console.log(props.postId)}
        <div className={classes.codeBlock} onClick={() => props.setPostToRender(props.postId)}>
          <div>
          {props.title}
          </div>
          <div>
          {props.username}
          </div>
        </div>
      </Link>
    </section>
  );
}
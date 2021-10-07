import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Post.module.css';

export default function Post(props) {
  return (
    <section>
      <Link to={'/home/postview/'}>
        {console.log(props.postId)}
        <div className={classes.codeBlock} onClick={() => props.setPostToRender(props.postId)}>
          <div>
            {props.code}
          </div>
        </div>
      </Link>
    </section>
  );
}
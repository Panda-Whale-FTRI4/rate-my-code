import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Post.module.css';

export default function Post(props) {
  return (
    <section className={classes.postSection}>
      <Link to={'/home/postview/'}>
        <div className={classes.codeBlock} onClick={() => props.setPostToRender(props.postId)}>
          <div className={classes.header}>
            <h3 className={classes.title}>
              {props.title}
            </h3>
          </div> 
          <div className={classes.username}>
            User: {props.username}
          </div>
          <div className={classes.date}>
          Date Posted: {props.date}
          </div>
          <p className={classes.issue}>
            {props.issue}
          </p>
        </div>
      </Link>
    </section>
  );
}
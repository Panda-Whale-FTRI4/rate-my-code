import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Post.module.css';

export default function Post(props) {
  return (
    <section>
        {console.log('Posts.jsx: ', props)}
      <Link to={'/home/postview/'}>
        <div className={classes.codeBlock}>
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
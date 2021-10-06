import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Post.module.css';

export default function Post(props) {
  return (
    <section>
      {/* update the link to /postview/${props.info.id} to get the post id from props and redirect there */}
      <Link to={'/home/postview/'}>
        <div className={classes.codeBlock}>
          <div>
            {props.code}
          </div>
        </div>
      </Link>
    </section>
  );
}
import React, { useState, useEffect, useRouteMatch } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Container from '@mui/material/Container';
import 'react-pro-sidebar/dist/css/styles.css';

import CreatePost from '../components/CreatePost.jsx';
import Feed from '../components/Feed.jsx';
import PostView from '../components/PostView.jsx';
import classes from './MainContainer.module.css';
import './custom.scss';

export default function MainContainer() {

  const [topic, setTopic] = useState();
  const [postToRender, setPostToRender] = useState();
  
  return (
    <Container className={classes.mainContainer}>
      <div className={classes.random}></div>
      <ProSidebar className={classes.sidebar}>
        <Menu iconShape="square">
          <h2 className={classes.header}>Choose A Topic Below</h2>
          <MenuItem>
            <Link to="/home">Home</Link>
          </MenuItem>
          <MenuItem onClick={() => setTopic('Javascript')}><Link to='/home/feed'>JavaScript</Link></MenuItem>
          <MenuItem onClick={() => setTopic('Python')}><Link to='/home/feed'>Python</Link></MenuItem>
          <MenuItem onClick={() => setTopic('C#')}><Link to='/home/feed/'>C#</Link></MenuItem>
          <MenuItem onClick={() => setTopic('C++')}><Link to='/home/feed/'>C++</Link></MenuItem>
          <MenuItem onClick={() => setTopic('Java')}><Link to='/home/feed/'>Java</Link></MenuItem>
          <MenuItem onClick={() => setTopic('PHP')}><Link to='/home/feed/'>PHP</Link></MenuItem>
        </Menu>
      </ProSidebar>
      <div className={classes.feedContainer}>
        <Switch>
          <Route path="/home/createpost">
            <CreatePost />
          </Route>
          <Route path='/home/feed'>
            <Feed topic={topic} setPostToRender={setPostToRender} />
          </Route>

          <Route path='/home/postview'>
            <PostView postToRender={postToRender} />
          </Route>

        </Switch>
      </div>
      

      <div>
        <Link to="/home/createpost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Link>
      </div>
    </Container>
  );
}

//@import '~react-pro-sidebar/dist/scss/styles.scss'; for styles.scss


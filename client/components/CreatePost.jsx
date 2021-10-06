import React, { useState, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function CreatePost() {
  const [newPost, setNewPost] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const titleInputRef = useRef();
  const topicInputRef = useRef();
  const issueInputRef = useRef();
  const codeInputRef = useRef();

  function submitCode () {
    const enteredTitle = titleInputRef.current.value;
    const enteredTopic = topicInputRef.current.value;
    const enteredIssue = issueInputRef.current.value;
    const enteredCode = codeInputRef.current.value;
    
    const createdPost = {
      topic: enteredTopic,
      date: Date.now(),
      upvotes: 0,
      downvotes: 0,
      title: enteredTitle,
      issue: enteredIssue,
      code: enteredCode
    };

    // create fetch request to POST the new post
    fetch('/api/createPost', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json' //not sure about what needs to go here
      },
      body: JSON.stringify(createdPost)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setNewPost(data);
          setSubmitted(true);
        }
      })
      .catch((err) => console.log('POST REQUEST ERROR: ', err));
  }

  //redirect if login is verified or successfully signedup

  if (submitted) {
    return (
      <Redirect to={{ pathname: '/home' }} />
    );
  }

  // drop down selector for topic
  const topicSelector = (
    <div>
      <select name="topic-menu" id="topic-menu">
        <option value="Javascript">Javascript</option>
        <option value="Python">Python</option>
        <option value="C#">C#</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
        <option value="PHP">PHP</option>
      </select>
    </div>
  );

  // remove MainContainer when we implement React Router
  return (
    <div>
      <form>
        <div>
          <h4> <label htmlFor="title">Title </label> </h4>
          <input type="text" required id="title" ref={titleInputRef}></input>
        </div>
        <div>
          <h4> <label htmlFor="topic">Topic </label> </h4>
          {/* <input type="text" required id="topic" ref={topicInputRef}></input> */}
          {topicSelector}
        </div>
        <div>
          <h4> <label htmlFor="issue">Issue </label> </h4>
          <input type="text" required id="issue" ref={issueInputRef}></input>
        </div>
        <div>
          <h4> <label htmlFor="code">Code </label> </h4>
          <input type="text" required id="code" ref={codeInputRef} ></input>
        </div>
        <div>
          <Button variant="contained" onClick={submitCode}> 
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
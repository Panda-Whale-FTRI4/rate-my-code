import React, { useState, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import MainContainer from "../containers/MainContainer.jsx";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";


export default function CreatePost() {
  const [newPost, setNewPost] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const titleInputRef = useRef();
  const topicInputRef = useRef();
  const issueInputRef = useRef();
  const triedInputRef = useRef();
  const causeInputRef = useRef();
  const codeInputRef = useRef();

  function submitCode () {
    const enteredTitle = titleInputRef.current.value;
    const enteredTopic = topicInputRef.current.value;
    const enteredIssue = issueInputRef.current.value;
    const enteredTried = triedInputRef.current.value;
    const enteredCause = causeInputRef.current.value;
    const enteredCode = codeInputRef.current.value;
    const createdPost = {
      topic: enteredTopic,
      // date: Date.now(),
      upvotes: 0,
      downvotes: 0,
      title: enteredTitle,
      issue: enteredIssue,
      tried: enteredTried,
      cause: enteredCause,
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
      <Redirect
        to={{
          pathname: '/home',
        }}
      />
    );
  }

  // drop down selector for topic
  const dropDownMenu = (
    <div>
      <h4 name="choose-topic">Choose A Topic:</h4>
      <select name="topic-menu" id="topic-menu">
        <option value="=javacript">JavaScript</option>
        <option value="python">Python</option>
        <option value="c-sharp">C#</option>
        <option value="c-plus-plus">C++</option>
        <option value="java">Java</option>
        <option value="php">PHP</option>
      </select>
    </div>
  );

  // remove MainContainer when we implement React Router
  return (
    <div>

      <form>
          <div>
            <label htmlFor="title">Title </label>
            <input
              type="text"
              required
              id="title"
              ref={titleInputRef}
            ></input>
          </div>
          <div>
            <label htmlFor="topic">Topic </label>
            <input
              type="text"
              required
              id="topic"
              ref={topicInputRef}
            ></input>
          </div>
          <div>
            <label htmlFor="issue">Issue </label>
            <input
              type="text"
              required
              id="issue"
              ref={issueInputRef}
            ></input>
          </div>
          <div>
            <label htmlFor="tried">Tried </label>
            <input
              type="text"
              required
              id="tried"
              ref={triedInputRef}
            ></input>
          </div>
          <div>
            <label htmlFor="cause">Cause </label>
            <input
              type="text"
              required
              id="cause"
              ref={causeInputRef}
            ></input>
          </div>
          <div>
            <label htmlFor="code">Code </label>
            <input
              type="text"
              required
              id="code"
              ref={codeInputRef}
            ></input>
          </div>
          <div>
            <Button variant="contained" onClick={submitCode}>
              Submit
            </Button>
          </div>
   
        </form>

      {/* <div><HighlightOffIcon id="cancel-post"/></div>

      <div>
        <TextField id="title" label="Title" variant="outlined" ref={titleInputRef}/>
      </div>
      <div>{dropDownMenu}</div>
      <div>
        <TextField id="issue" label="What is the problem" variant="outlined" size="small" fullWidth ref={issueInputRef}/>
      </div>
      <div>
        <TextField id="tried" label="What I've Tried" variant="outlined" size="medium" fullWidth ref={triedInputRef}/>
      </div>
      <div>
        <TextField id="cause" label="Why I think it's not working" variant="outlined" size="large" fullWidth ref={causeInputRef}/>
      </div>
      <div>
        <TextField
          id="standard-textarea"
          label="< Paste Your Code Here />"
          placeholder="Hello World!"
          multiline
          variant="filled"
          ref={codeInputRef}
        />
      </div>
      <div>
        <Button id="submit" variant="contained" onClick={submitCode}>
          Submit
        </Button>
      </div> */}
    </div>
  );
}

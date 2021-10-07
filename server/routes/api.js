// Require Packages
const express = require('express');
const apiController = require('../controllers/apiController');

// Initializer our router
const router = express.Router();

/* Handle routes to the /api route */


//Special case for posts to grab usernames
//Created by Elijah and Parker
router.get('/getUser/:id', apiController.getUsername, (req, res) => {
  if (!res.locals.user) {
    res.status(500).json({ message: 'No user was found' });
  }
  res.status(200).json(res.locals.user);
});


// Handle POST request to /getTopic
// Receive a topicID the req.body
// Use getTopic to retrieve the requested topicID and store in res.locals.topic
// Return the res.locals.topic as json data
router.get('/getTopic/:topic', apiController.getTopic, (req, res) => {
  if (!res.locals.topic) {
    res.status(200).json({ message: 'No posts have been created' });
  }
  res.status(200).json(res.locals.topic);
});

// Handle POST request to /getPost
//TEST COMMENTS - Not used in production
// router.get('/getPost/:id', apiController.getPost, (req, res) => {
//   if (!res.locals.post) {
//     res.status(500).json({ message: 'No post found with that information.' });
//   }
//   res.status(200).json(res.locals.post);
// });

// Handle POST request to /createPost
router.post('/createPost', apiController.createPost, (req, res) => {
  if (!res.locals.createdPost) {
    res
      .status(500)
      .json({ message: 'Something went wrong creating your post.' });
  }
  res.status(200).json(res.locals.createdPost);
});

// Handle POST request to /editPost
router.post('/editPost', apiController.editPost, (req, res) => {
  if (!res.locals.editedPost) {
    res
      .status(500)
      .json({ message: 'Something went wrong editing your post.' });
  }
  res.status(200).json(res.locals.editedPost);
});

//id in route parameter is the Post ID. Deletes all comments linked to PostID and then deletes the post
router.delete(
  '/deletePost/:id',
  apiController.deleteAllComments,
  apiController.deletePost,
  (req, res) => {
    if (!res.locals) {
      res
        .status(500)
        .json({ message: 'Something went wrong deleting your post.' });
    }
    res.status(200).json(res.locals);
  }
);

// Handle POST request to /votes
/*
  Expected Format of req.body:
  {
    vote: 'upvote' or 'downvote'
    commentID: whatever the comment _id is
    postID: whatever the post _id is
  }
*/
// app.post('/votes', apiController.Votes, (req, res) => {
//   res.status(200).json(res.locals.votes);
// });

// Return an object: res.local = {{posts: {_id, topic, date, ...}, {comments: []}}
router.get(
  '/getPost/:id',
  apiController.getPost,
  apiController.getComments,
  (req, res) => {
    if (!res.locals.posts) {
      res.status(500);
      res.json({
        message: 'Something went wrong trying to grab these comments',
      });
    }
    res.status(200).json(res.locals);
  }
);

//TEST COMMENTS - Not used in production
// router.get('/getComments/:postid', apiController.getComments, (req, res) => {
//   if (!res.locals.comments) {
//     res.status(500);
//     res.json({ message: 'Something went wrong trying to grab these comments' });
//   }
//   res.status(200).json(res.locals.comments);
// });

// Handle POST request to /createComment
router.post('/createComment', apiController.createComment, (req, res) => {
  if (!res.locals.createdComment) {
    res
      .status(500)
      .json({ message: 'Something went wrong creating your comment.' });
  }
  res.status(200).json(res.locals.createdComment);
});

//Handle POST requests that edit our comments (Comment Up/Down vote is not yet supported)
router.post(
  '/editComment/:commentId',
  apiController.editComment,
  (req, res) => {
    if (!res.locals) {
      res
        .status(500)
        .json({ message: 'Something went wrong while creating your comment' });
    }
    res.status(200).json(res.locals);
  }
);

// Handle DELETE request to /deleteComment passing in the comment ID
router.delete(
  '/deleteComment/:commentId',
  apiController.deleteComment,
  (req, res) => {
    if (!res.locals) {
      res
        .status(500)
        .json({ message: 'Something went wrong in deleting your comment.' });
    }
    res.status(200).json(res.locals);
  }
);

// export as router
module.exports = router;

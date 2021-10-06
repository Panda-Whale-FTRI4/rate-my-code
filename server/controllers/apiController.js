// TODO: import DB models
const db = require('../models/models');

const apiController = {};

//query to filter posts by topic (checked)
apiController.getTopic = (req, res, next) => {
  const topic = req.params.topic;

  const query = {
    text: `
      SELECT *
      FROM posts
      WHERE topic = $1;
    `,
    params: [topic]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.getTopic',
        message: { err: err.message }
      });
    }

    res.locals.topic = dbResponse.rows;
    //console.log('Local Topic:', res.locals.topic)
    return next();
  });
};

//query to get post by post_id -- front end is looking for an object with key/value pairs of the posts and comments
apiController.getPost = (req, res, next) => {
  const id = req.params.id;
  console.log('params: ', req.params.id);
  const query = {
    text: `
      SELECT *
      FROM posts
      WHERE _id = $1;
    `,
    params: [id]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.getPost',
        message: { err: err.message }
      });
    }
    console.log('Rows: ', dbResponse.rows[0]);
    res.locals.post.postContent = dbResponse.rows[0];
    return next();
  });
};

//query to get comments by post_id (foreign key)
apiController.getComments = (req, res, next) => {
  const id = req.body.post;

  // get comments from comments table using foreign key of correct post
  const query = {
    text: `
      SELECT c.*
      FROM comments c
      LEFT JOIN posts p
      ON c.post_id = p.$1;
    `,
    params: [id]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.getComments',
        message: { err: err.message }
      });
    }

    res.locals.post.comments = dbResponse.rows;
    return next();
  });
};

/*
  const createdPost = {
      topic: enteredTopic,
      date: Date.now(),
      upvotes: 0,
      downvotes: 0,
      title: enteredTitle,
      issue: enteredIssue,
      tried: enteredTried,
      cause: enteredCause,
      // description: enteredDescription,
      code: enteredCode,
      userId: null, // use cookie data to input user ID
    };
*/
apiController.createPost = (req, res, next) => {
  console.log('About to create a post');
  const user_id = req.cookies.userID;
  const {
    topic,
    date,
    upvotes,
    downvotes,
    title,
    issue,
    code
    //user_id (used for testing in backend)
  } = req.body;

  const query = {
    text: `
      INSERT INTO posts (
        topic,
        date,
        upvotes,
        downvotes,
        title,
        issue,
        code,
        user_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    params: [
      topic,
      date,
      upvotes,
      downvotes,
      title,
      issue,
      code,
      user_id
    ]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.createPost',
        message: { err: err.message }
      });
    }
    res.locals.createdPost = true;
    return next();
  });
};

apiController.editPost = (req, res, next) => {

  const {
    _id,
    topic,
    date,
    upvotes,
    downvotes,
    title,
    issue,
    code
  } = req.body.editedPost;
  console.log('Incoming Request Body: ', req.body)

  const query = {
    text: `
      UPDATE posts
      SET
        topic = $2,
        date = $3,
        upvotes = $4,
        downvotes = $5,
        title = $6,
        issue = $7,
        code = $8
      WHERE _id = $1;
    `,
    params: [
      _id,
      topic,
      date,
      upvotes,
      downvotes,
      title,
      issue,
      code
    ]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.editPost',
        message: { err: err.message }
      });
    }
    console.log('Made it here!')
  //  res.locals.editedPost = dbResponse.rows[0];
    return next();
  });
};

apiController.createComment = (req, res, next) => {
  const user_id = req.headers.cookie;

  const {
    comment,
    code,
    upvotes,
    downvotes,
    date,
    post_id
  } = req.body.createComment;

  const query = { //DB Edit; Added Date to end of SQL Database, and Query was updated accordingly.
    text: `
      INSERT INTO comments (
        comment,
        code,
        upvotes,
        downvotes,
        post_id,
        user_id,
        date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `,
    params: [
      comment,
      code,
      upvotes,
      downvotes,
      post_id,
      user_id,
      date
    ]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.createComment',
        message: { err: err.message }
      });
    }

    res.locals.createdComment = dbResponse.rows[0];
    return next();
  });
};


module.exports = apiController;
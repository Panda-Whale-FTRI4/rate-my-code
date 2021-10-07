// TODO: import DB models
const db = require('../models/models');

const apiController = {};

//created by elijah and parker
apiController.getUsername = (req, res, next) => {
  const id = req.params.id;
  // Construct a DB query for username
  const query = {
    text: `
    SELECT *
    FROM users
    WHERE _id = $1;
    `,
    params: [id]
  };

  // Query our DB to find username store result in res.locals.user
  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.getUsername',
        message: { err: err.message }
      });
    }
    res.locals.user = dbResponse.rows[0].username;
    return next();
  });
};

//query to filter posts by topic (checked)
apiController.getTopic = (req, res, next) => {
  const topic = req.params.topic;

  const query = {
    text: `
    SELECT u.username, p.*
    FROM posts AS p
    FULL OUTER JOIN users AS u
    ON p.user_id = u._id
    WHERE p.topic = $1;
    `,
    params: [topic],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.getTopic',
        message: { err: err.message },
      });
    }

    res.locals.topic = dbResponse.rows;
    console.log('Local Topic:', res.locals.topic)
    return next();
  });
};

/*----------------------Section for posts --------------------------*/
//query to get post by post_id -- front end is looking for an object with key/value pairs of the posts and comments (checked)
apiController.getPost = (req, res, next) => {
  const id = req.params.id;
  //console.log('params: ', req.params.id);

  const query = {
    text: `
      SELECT u.username, p.*
      FROM posts AS p
      FULL OUTER JOIN users AS u
      ON u._id = p.user_id
      WHERE p._id = $1;
    `,
    params: [id],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.getPost',
        message: { err: err.message },
      });
    }
    res.locals.posts = dbResponse.rows[0];
    return next();
  });
};

//create a post (checked)
//Make sure to test with userId w/ frontend team
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
    // user_id, //(used for testing in backend)
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
    params: [topic, date, upvotes, downvotes, title, issue, code, user_id],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.createPost',
        message: { err: err.message },
      });
    }
    res.locals.createdPost = true;
    return next();
  });
};

//edit an existing post (checked)
apiController.editPost = (req, res, next) => {
  const { _id, topic, date, upvotes, downvotes, title, issue, code } = req.body;
  //console.log('Incoming Request Body: ', req.body)

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
    params: [_id, topic, date, upvotes, downvotes, title, issue, code],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.editPost',
        message: { err: err.message },
      });
    }
    //console.log('Made it here!')
    res.locals.editedPost = true;
    return next();
  });
};

apiController.deletePost = (req, res, next) => {
  const id = req.params.id;
  const query = {
    text: `DELETE FROM posts
     WHERE _id = $1;`,
    params: [id],
  };
  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.deletePost',
        message: { err: err.message },
      });
    }
    res.locals = true;
    return next();
  });
};

//Deleting all comments connected with the postID
apiController.deleteAllComments = (req, res, next) => {
  //DELETE FROM comments WHERE post_id = 3;
  const id = req.params.id;
  const query = {
    text: `
    DELETE FROM comments
    WHERE post_id = $1;`,
    params: [id],
  };
  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.deleteAllComments',
        message: { err: err.message },
      });
    }
    res.locals = true;
    return next();
  });
};

/*----------------------Section for comments --------------------------*/
//query to get comments by post_id (foreign key)
//CHECKED
apiController.getComments = (req, res, next) => {
  const id = req.params.id;
  //console.log({ id });
  // get comments from comments table using foreign key of correct post
  const query = {
    text: `
      SELECT u.username, c.*
      FROM comments c
      FULL OUTER JOIN posts p
      ON c.post_id = p._id
      FULL OUTER JOIN users u
      ON u._id = c.user_id
      WHERE p._id = $1;
    `,
    params: [id],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.getComments',
        message: { err: err.message },
      });
    }
    console.log('Rows: ', dbResponse.rows);
    res.locals.comments = dbResponse.rows;
    return next();
  });
};

apiController.createComment = (req, res, next) => {
  const user_id = req.headers.cookie;

  //tested by commenting out req.headers.cookie and adding user_id to the below code
  const { comment, code, upvotes, downvotes, date, post_id } = req.body;

  const query = {
    //DB Edit; Added Date to end of SQL Database, and Query was updated accordingly.
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
    params: [comment, code, upvotes, downvotes, post_id, user_id, date],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.createComment',
        message: { err: err.message },
      });
    }

    res.locals.createdComment = dbResponse.rows[0];
    return next();
  });
};

apiController.editComment = (req, res, next) => {
  const id = req.params.commentId;
  const { comment, code, upvotes, downvotes, date } = req.body;
  //console.log('Incoming Request Body: ', req.body)

  const query = {
    text: `
      UPDATE comments
      SET
        comment = $2,
        code = $3,
        upvotes = $4,
        downvotes = $5,
        date = $6
      WHERE _id = $1;
    `,
    params: [id, comment, code, upvotes, downvotes, date],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.editComment',
        message: { err: err.message },
      });
    }
    //console.log('Made it here!')
    res.locals = true;
    return next();
  });
};

apiController.deleteComment = (req, res, next) => {
  const id = req.params.commentId;
  const query = {
    text: `
      DELETE FROM comments
      WHERE _id = $1;
    `,
    params: [id],
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      next({
        log: 'ERROR: apiController.deleteComment',
        message: { err: err.message },
      });
    }
    // console.log('Response Body: ', dbResponse.rows);
    res.locals = true;
    return next();
  });
};

module.exports = apiController;

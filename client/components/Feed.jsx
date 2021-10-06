import React, { useEffect, useState } from 'react';
import FeedCodeBlock from './FeedCodeBlock.jsx';

export default function Feed(props) {
  
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch(`/api/getTopic/${props.topic}`)
      .then((res) => res.json())
      .then((data) => {
        setCodeBlocks(data);
      })
      .catch((err) => console.log(err));

  };

  const postsToRetrieve = codeBlocks.map(post => {
    return <FeedCodeBlock key={post._id} code={post.code} />;
  });

  console.log('fetch request made with ', props.topic);

  return (
    <div>
      <div>{postsToRetrieve}</div>
    </div>
  );
}

/*

codeBlocks = [
  {
    _id: 1,
    topic: 'Java',
    code: console.log('hi');
  },
  {
    _id: 32,
    topic: 'Java',
    code: console.log('hello');
  },
  {
    _id: 44443,
    topic: 'Java',
    code: console.log('hiiiiii');
  }
];

*/
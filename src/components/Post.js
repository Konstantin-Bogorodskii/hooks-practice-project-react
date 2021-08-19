import React, { useState } from 'react';

function sum(n) {
  console.log(n);
  return n + 1;
}

function Post({ title, name, email, body }) {
  const [count, setCount] = useState(0);
  const [isGreen, setIsGreen] = useState(false);
  const countSum = React.useMemo(() => sum(count), [count]);

  return (
    <div className="article-content">
      <div className="article-title">
        <a href="/">{title}</a>
        <a href="/">{name}</a>
      </div>
      <p
        className="article-text"
        style={{ color: isGreen ? 'darkgreen' : 'darkblue' }}
        onClick={() => setIsGreen(!isGreen)}
      >
        {body}
        {email}
      </p>
      {countSum}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default React.memo(Post);

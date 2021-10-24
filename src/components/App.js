import React, { useState, useEffect, useRef, useContext, useReducer } from 'react';
import Header from './Header';
import PostList from './PostList';
import Footer from './Footer';
import ThemeContext from '../context.js';

function init(state) {
  return state;
}

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return state;

    default:
      return state;
  }
}

function App() {
  const [posts, setPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const [type, setType] = useState('posts');
  const titleInputRef = useRef(null);
  console.log(titleInputRef);

  const { theme, setTheme } = useContext(ThemeContext);
  const [data, dispatch] = useReducer(reducer, { posts: [], check: false, type: 'posts' }, init);

  useEffect(() => {
    document.title = `Page ${data.type}`;
    fetch(`https://jsonplaceholder.typicode.com/${data.type}`)
      .then(response => response.json())
      .then(json => {
        setPosts(json);
      });
    return () => {
      document.title = 'Page';
    };
  }, [data.type]);

  const change = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setCheck(!data.check);
  };

  const handleFocus = () => {
    titleInputRef.current.focus();
    titleInputRef.current.style.color = 'tomato';
  };

  return (
    <div className={`app ${theme}`}>
      <div className="form">
        <input ref={titleInputRef} />
        <button onClick={handleFocus}>Focus</button>
      </div>
      <Header changeType={setType} check={data.check} changeTheme={change} />
      <PostList posts={data.posts} />
      <Footer />
    </div>
  );
}

export default App;

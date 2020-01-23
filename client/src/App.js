import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Chat app.
        </p>
        <a
          className="App-link"
          href="../src/components/ChatForm.jsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click to start chat     </a>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './styles/main.css'

const App = () => {
  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <p className='title'>Guest Book</p>
        </div>
        <div className='add-section'>
          <a className='add-btn' href='#'> Add Note</a>
        </div>
      </div>
      <div className="posts">
        <p className='centerText'>No Posts</p>
      </div>
      <div className='modal'>
        
      </div>
    </div>
  );
};

// Create a root and render the App component
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);

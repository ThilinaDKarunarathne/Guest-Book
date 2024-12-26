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
        <div className='form'>
          <div className='form-header'>
            <div>
              <p className='form-header-text'>Create a Note</p>
            </div>
            <div>
              <a href='#' className='close-btn'>X</a>
            </div>
          </div>
          <form action="">
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input type='text' name='' id='title' className='form-control' />
            </div>
            <div className='form-group'>
              <label htmlFor='content'>Content</label>
              <textarea className='form-control' name='content' id='title' cols='30' rows='8'></textarea>
            </div>
            <div className='form-group'>
              <input type='submit' value="SAVE" className='btn' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Create a root and render the App component
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);

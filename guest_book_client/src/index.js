import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'; 
import './styles/main.css'
import { Note } from './components/note';

const baseURL = 'http://localhost:8000'


const App = () => {

  const [modalVisible,setModalVisible]=useState(false);
  const [title,setTitle ] = useState('')
  const [content,setContent]=useState('')
  const [posts,setPosts]=useState([])
 
  const createNote=(event)=>{
  //   event.preventDefault();
  //   console.log(title)
  //   console.log(content)

  //   setTitle('')
  //   setContent('')
  //   setModalVisible(false)

  }

  const getAllPosts = async () =>{
    const response = await fetch(`${baseURL}/posts/`)
    const data = await response.json()

    if(response.ok){
      console.log(data)
      setPosts(data)
    }
    else{
      console.log("Failed Network Request")
    }
  }

  useEffect(
    ()=>{
      getAllPosts()
    },[]
  )

  const deleteItem=(noteId)=>{
    console.log(noteId)
  }

  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <p className='title'>Guest Book</p>
        </div>
        <div className='add-section'>
          <a className='add-btn' href='#'
              onClick={()=>setModalVisible(true)}
          > Add Note</a>
        </div>
      </div>
      
      {posts.length > 0?
          (<div className="post-list">
          {
            posts.map(
              (item)=>(
                <Note title={item.title} 
                content={item.content}
                        onclick={deleteItem(item.id)}
                        key={item.id}
                  />

                )
              )
          }
          </div>)
          :(
            <div className="posts">
              <p className='centerText'>No Posts</p>
            </div>
          )
        }
      <div className={modalVisible? 'modal':'modal-not-visible'}>
        <div className='form'>
          <div className='form-header'>
            <div>
              <p className='form-header-text'>Create a Note</p>
            </div>
            <div>
              <a href='#' className='close-btn'
                  onClick={()=>setModalVisible(false)}
                  >X</a>
            </div>
          </div>
          <form action="">
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input type='text' name='title' id='title' 
                value ={title}
                onChange={(e)=>setTitle(e.target.value)}
                className='form-control' />
            </div>
            <div className='form-group'>
              <label htmlFor='content'>Content</label>
              <textarea className='form-control' name='content' id='title' 
                value ={content}
                onChange={(e)=>setContent(e.target.value)}
                cols='30' rows='8'></textarea>
            </div>
            <div className='form-group'>
              <input type='submit' value="SAVE" className='btn' onClick={createNote}/>
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

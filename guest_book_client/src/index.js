import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'; 
import './styles/main.css'
import { Note } from './components/note';

const baseURL = 'http://localhost:8000'
const noteId  = null


const App = () => {

  const [modalVisible,setModalVisible]=useState(false);
  const [title,setTitle ] = useState('')
  const [content,setContent]=useState('')
  const [posts,setPosts]=useState([])
 
  const createNote= async(event)=>{
    event.preventDefault();

    const new_request= new Request(
      `${baseURL}/posts/`,
      {
        body:JSON.stringify({title,content}),
        headers:{
          'Content-Type':'Application/Json'
        },
        method:'POST'
      }
    );

    const response = await fetch(new_request) ;
    const data= await response.json();
    if (response.ok){
      console.log(data)
    }
    else{
      console.log("failed Network Request")
    }

    console.log(title)
    console.log(content)

    setTitle('')
    setContent('')
    setModalVisible(false)

    getAllPosts()

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

  const deleteItem= async (noteId)=>{
    console.log(noteId)
    const response = await fetch(`${baseURL}/posts/${noteId}/`,
      {method:'DELETE'}
    )

    if (response.ok){
      console.log(response.status)
    }

    getAllPosts()
  }

  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <p className='title'>Guest Book</p>
        </div>
        <div className='add-section'>
          <a className='add-btn' 
              onClick={()=>setModalVisible(true)}
          > Add Note</a>
        </div>
      </div>
      
      {posts.length > 0?
          (
          <div className="post-list">
          {
            posts.map(
              (item)=>(
                <Note title={item.title} 
                      content={item.content}
                      noteId={item.id}
                      key={item.id}
                      onclick={deleteItem}
                  />
                )
              )
          }
          </div>
          
        )
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
              <a  className='close-btn'
                  onclick={getAllPosts}
                  >X</a>
            </div>
          </div>
          <form onSubmit={createNote}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input type='text' 
                    name='title' id='title' 
                    value ={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className='form-control' 
                    required
                />
            </div>
            <div className='form-group'>
              <label htmlFor='content'>Content</label>
              <textarea className='form-control'  
                        name='content' 
                        id='content' 
                        value ={content}
                        onChange={(e)=>setContent(e.target.value)}
                        cols='30' rows='8'
                        required>
              </textarea>
            </div>
            <div className='form-group'>
              <input type='submit' value="SAVE" className='btn' href='#' onClick={createNote}/>
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

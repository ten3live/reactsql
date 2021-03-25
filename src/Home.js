import React, { useState,useEffect } from "react";
import {BrowserRouter as Router ,NavLink,Redirect,Link} from 'react-router-dom'
import Route from 'react-router-dom/Route'

import axios from "axios";

function App() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loggedin, setloggedin] = useState(true);
  
  const [datad, setdatad] = useState([
  
    {
     
    }
  ]);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password",password );
    if (fileName === '') {
      alert('Please Add Image First')
    } else if (name === '' || email === '' || password === '') {
      alert('Please Fill All The Fields')
    } else {


    try {
      const res = await axios.post(
        "http://localhost:3001/posts",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  }  
  const post=()=>{
    return(
      <div><p>Home</p></div>
    )
  }
  const postScreen=()=>{
    return(
      <p>HomeScreen</p>
    )
  }

  const posts=()=>{
    return(
      <div><p>AboutScreen</p></div>
    )
  }
  const POSTD=(params)=>{
    return(<>
      <div><p>{params.username}Solangi</p></div>
      </>)
  }

  const appdata=async()=>{
    const data= await fetch('http://localhost:3001/posts');
    const dataSaved=await data.json()
    
   await setdatad(dataSaved)
     
  }
  

  appdata() 
  
  return (<Router>
    
    
     <Route path='/' exact strict component={post}/>
     <Route path='/about' exact strict component={posts}/>
     <Route path='/user/:username' exact strict render={({match})=>(
      loggedin ?(<POSTD username={match.params.username}/>) : (<Redirect to='/' />))
     }/>
<NavLink to='/'  exact strict activeStyle={{color:'green'}}>Home</NavLink>
<NavLink to='/about' exact strict activeStyle={{color:'green'}}>About</NavLink>
<NavLink to='/User/Sajjad ' exact strict activeStyle={{color:'green'}}>User</NavLink>
<div className="App">
      <label class="upload" htmlFor="file">Upload Image</label>
      <input id="file" name="file"type="file" onChange={saveFile} hidden />

      <input placeholder="Post Title"type="text"value={name} name="name" onChange={(e)=>{
         setName(e.target.value)}} />
      <input placeholder="Post Description"type="text" value={email}name="email" onChange={(e)=>{
        setEmail(e.target.value)}} />
      <input placeholder="contact No"type="text"value={password} name="password" onChange={(e)=>{
        setpassword(e.target.value)}} />
      <button onClick={uploadFile}>Post Now</button>

    </div>
  
  
  {datad.map((recipe)=>{
    return       <div key={recipe.id}>   <img src={"http://localhost:3001/"+recipe.uploads} className="img-rounded img-responsive" alt="not available"/><p>Name: {recipe.name}</p><p>Email: {recipe.email}</p><p>Password: {recipe.password}</p>    </div> 
       })} 
   </Router>);
}

export default App;
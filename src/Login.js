import React, { useState,useEffect } from "react";
import axios from "axios";
import Home from "./Home";
function Register() {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
 
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
    if(fileName===''){
      alert('Please Add Image First')
    }else if(name===''||email===''||password===''){
      alert('Please Fill All The Fields')
    }else{

      try {
        const res = await axios.post(
          "http://localhost:3001/userss",
          formData
        );
        console.log(res);
        
      } catch (ex) {
        console.log(ex);
        alert('Error While Uploading')
      } } };
  
  return (<div className="Register">

      <input type="file" onChange={saveFile} />
      <input placeholder="username"type="text"value={name} name="name" onChange={(e)=>{
         setName(e.target.value)}} />
      <input placeholder="email"type="text" value={email}name="email" onChange={(e)=>{
        setEmail(e.target.value)}} />
      <input placeholder="password"type="text"value={password} name="password" onChange={(e)=>{
        setpassword(e.target.value)}} />
      <button onClick={uploadFile}>Register</button>

    </div>);
}
function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loggedin, setloggedin] = useState(false);
  const [RegisterNow, setRegisterNow] = useState(false);
  const RegisterNows=()=>{
    setRegisterNow(!RegisterNow)
  }
    
const NewUser=()=>{
    return(
      <div className="Login">
      <input placeholder="email"type="text" value={email}name="email" onChange={(e)=>{
        setEmail(e.target.value)}} />
      <input placeholder="password"type="text"value={password} name="password" onChange={(e)=>{
        setpassword(e.target.value)}} />
      <button onClick={uploadFile}>SignIn</button>
 </div>
    )
}
  const uploadFile = async (e) => {
      try {
      const res = await axios.post("http://localhost:3001/usersd",{email:email,password:password}
      ).then((data)=>{
        console.log(data.data.length)
    if(data.data.length===0){
      console.log('invalid Data Plz Enter Correct Password/Email')
    }else if(data.data.length>=1){
      console.log('Great')
      setloggedin(true)
    } 
    })
    } catch (ex) {
      console.log(ex);
    }
  };

    return (
<div className="Login">
  {loggedin?<Home/>:RegisterNow?<Register/>:<NewUser/>}
     

    <input type="Submit" value={RegisterNow ? 'Login': 'Register'}onClick={RegisterNows}/>  


    </div>
  );

      }
export default Login;
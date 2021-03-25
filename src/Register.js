import React, { useState} from "react";
import axios from "axios";
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

export default Register;
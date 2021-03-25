const fileupload = require("express-fileupload");
const cors = require("cors");
const mysql = require('mysql');
const express = require('express');
const app= express();
const bodyparser=require('body-parser')
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyparser.json())
var mySQL = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sajjad"
});
mySQL.connect((err)=> {
  if (!err){
    console.log('Connected')
  }else{
    console.log('Failed To Connect: ' + JSON.stringify(err,undefined,2))
  }
})
app.listen(3001,()=>{
  console.log('Server Running on 3001')
})


//Photo
app.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});

//Register
app.post('/userss',(req,res)=>{
      
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;
  console.log(req.body)
  file.mv(`${newpath}${filename}`)
  mySQL.query('INSERT INTO `users` VALUES(?,?,?,?,?)',['',req.body.name,req.body.email,req.body.password,req.files.file.name],(err,rows,fields)=>{

  if(!err){
      // console.table(rows[0])
       res.send(rows)
    }else{
      console.log(err)
     
    }

  })
})


//READ SINGLE

app.get('/userss/:id',(req,res)=>{
  mySQL.query('SELECT * FROM users WHERE id=?',[req.params.id],(err,rows,fields)=>{
    if(!err){
      // console.table(rows[0])
       res.send(rows)
    }else{
      console.log(err)
     
    }

})})

//DELETE

app.delete('/userss/:id',(req,res)=>{
  mySQL.query('DELETE FROM users WHERE id=?',[req.params.id],(err,rows,fields)=>{
    if(!err){
      // console.table(rows[0])
       res.send('DELETED SUCCESSFULLY')
    }else{
      console.log(err)
     
    }

})})



// Update

app.put('/userss/update/:id',(req,res)=>{
 
  mySQL.query('UPDATE `users` SET `name`=? WHERE id=? ',[req.body.name,req.params.id],(err,rows,fields)=>{
    if(!err){
      // console.table(rows[0])
       res.send('Updated SUCCESSFULLY')
    }else{
      console.log(err)
     
    }

})})


// Login

app.post('/usersd',(req,res)=>{
  const {email,password}=req.body;
  
  mySQL.query('SELECT * FROM users WHERE email=? and password=?',[email,password],(err,rows,fields)=>{
    if(!err){
      // console.table(rows[0])
       res.send(rows)

      
    }else{
      console.log(err)
     
    }

  })
})


//Home
app.get('/posts',(req,res)=>{
  
  mySQL.query('SELECT * FROM posts WHERE id',(err,rows,fields)=>{
    if(!err){
      // console.table(rows[0])
       res.send(rows)

      
    }else{
      console.log(err)
     
    }

  })
})


//posts
app.post('/posts',(req,res)=>{
      
  const newpath = __dirname + "/files/posts/";
  const file = req.files.file;
  const filename = file.name;
  console.log(req.body)
  file.mv(`${newpath}${filename}`)
  mySQL.query('INSERT INTO `posts` VALUES(?,?,?,?,?)',['',req.body.name,req.body.email,req.body.password,req.files.file.name],(err,rows,fields)=>{

  if(!err){
      // console.table(rows[0])
       res.send(rows)
    }else{
      console.log(err)
     
    }

  })
})



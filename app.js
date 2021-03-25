const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

app.set('view engine','ejs');
app.use(express.static('./public'));
const app=express();

app.get('/',(req,res)=>res.render('home'))
const port = 3000;
app.listen(port,()=>{
    console.log('server 3000')
})
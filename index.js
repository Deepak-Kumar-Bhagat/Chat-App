//requiring express module
const express = require('express');

//passing express as a function
const app =express();

//requiring path module
const path = require("path");

//requiring http module and creating server for express;
const http=require('http');
const server=http.createServer(app);

//declare port number
const port =8000;

//setting view engine to ejs
app.set('view engine','ejs');

//setting default views folder name to my folder name and joining current directory to it
app.set('views', path.join(__dirname,'client'));

//middleware between browser and server
app.use(express.urlencoded());

//adding static files like style.css
app.use(express.static('client'));

//getting response from url 
app.get('/home',function(req,res){

        return res.render('index',{
            title:"Chat App",
        });
});

//requiring socket.io module and running it at created server
const io=require('socket.io')(server);

//setting up connection with different browsers
io.on('connection',(socket)=>{
    //console.log("connected");
    socket.on('join',(name)=>{
    //console.log(name);
    socket.broadcast.emit('detail',name);   
    });
    socket.on('sent',(person)=>{
        //console.log(person);
        socket.broadcast.emit('receive',person);
    });
});

//listening to the port
server.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("server is running");
});


//getting handler to operate socket library after including library into html file
const socket=io();


const container=document.querySelector('.container');

//setting time
let date= new Date();
let hour=date.getHours();
let minutes=date.getMinutes();
let std="AM";

if(hour>12){
  std="PM";
}

if(minutes<10){
    minutes="0"+minutes;
}


//taking users name
let name="";
do{
    name=prompt('Please Enter your Name');

}while(!name);

//sending to server
socket.emit('join',name);

//receiving user details from server
socket.on('detail',(name)=>{
    //console.log(name);
    let div=document.createElement('div'); 
    let template=`<h2 class="join">${name} has joined...</h2><h3 class="time-join">${hour+":"+minutes+" "+std}</h3>`;
    div.innerHTML=template;
    container.append(div); 
    });


//taking message from textarea
let textarea=document.querySelector('#textarea');
textarea.addEventListener('keyup',(ele)=>{
    if(ele.key=='Enter'){
        Message(ele.target.value);
    }
});

//modify taken message from textbox by adding user name
function Message(text){

    let person={
        sender:name,
        msg:text.trim(),
    }
    //adding to display
    messageadd(person,'right');

    //sending to server
    socket.emit('sent',person);
     
    //making textarea empty
    textarea.value="";
}


//adding user message to display
function messageadd(person,sendmessage){
    let div=document.createElement('div');
    let type=sendmessage;
    div.setAttribute('class',type);
    let template=`<h3 class="head">${person.sender}</h3><p class="para-right">${person.msg}</p><h4 class="time">${hour+":"+minutes+" "+std}</h4>`;
    div.innerHTML=template;
    container.append(div);
}

//reciving message from server
socket.on('receive',(person)=>{
    //console.log(person);
    
    //displaying to all others 
        let div=document.createElement('div');
        let type='left';
        div.setAttribute('class',type);
        let template=`<h3 class="head">${person.sender}</h3><p class="para-left">${person.msg}</p><h4 class="time">${hour+":"+minutes+" "+std}</h4>`;
        div.innerHTML=template;
        container.append(div);

}); 
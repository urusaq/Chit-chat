const socket = io('http://localhost:3000');

const form = document.getElementById('sendCon');
const messageInput = document.getElementById('messageInput');
const msgContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText =  message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if(position == 'left')
    audio.play();  
}

form.addEventListener('submit' , (e) =>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You : ${message}`,'right');
  socket.emit('send',message);
  messageInput.value  = " ";
});

const name = prompt("enter your name to join chat");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
  append(`${name} joined the chat `,'centre')
});

socket.on('recieve',data=>{
  append(`${data.name} : ${data.message} `,'left')
});

socket.on('left',name=>{
  append(`${name} left the chat `,'centre')
});

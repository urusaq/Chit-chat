//this is node server that will manage socket connections

const io = require('socket.io')(3000,{
   cors:{
      origin:['http://127.0.0.1:5500'],
   },
}); 

const user = {};

io.on('connection',socket=>{
    //new user joined event
     socket.on('new-user-joined' , name=>{
      //   console.log(name , 'joined')
        user[socket.id] = name;
        socket.broadcast.emit('user-joined' , name);   //everybody else will get the message about joined user, except the one who joined.
     })

     //if some user send any message broadcast it to all the other users
     socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message : message , name : user[socket.id]})
     });

//if some user leaves the chat
socket.on('disconnect',message=>{
   socket.broadcast.emit('left',user[socket.id]);
   delete user[socket.id];
});
})
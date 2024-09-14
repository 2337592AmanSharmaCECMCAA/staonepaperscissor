const server=require('http').createServer();

const io=require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
const PORT=4000
server.listen(PORT,()=>console.log(`Server listening on ${PORT}`));
let readyPlayerCount=0;
io.on('connection',(socket)=>{
    console.log('A user is connected');
    console.log(socket.id);
    socket.on('ready',()=>{
        console.log('player ready',socket.id);
        readyPlayerCount++;
        console.log(readyPlayerCount);
        if(readyPlayerCount == 2){
            io.emit('startGame',socket.id);
        }
    });
    socket.on('slection',(slection)=>{
      socket.broadcast.emit('slection',slection);
      console.log(slection);
    })
    socket.on('disconnect',(reson)=>{
      console.log(`Client ${socket.id} disconnect: ${reson}`);
    })
})
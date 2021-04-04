// test websocket
import * as io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connection', () => {
  console.log('connected client to server');
});

socket.on('newNotes', (data) => {
  console.log(data);
  console.log('client please refresh');
});

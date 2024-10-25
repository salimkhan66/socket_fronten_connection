import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [chatSocket, setChatSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');

  const connectChat = () => {
    const socket = io.connect('http://localhost:8080/chat');

    socket.on('connect', () => {
      console.log('Connected to the /chat namespace');
      setConnected(true); // Update connection status
    });

    socket.on('rcv_message', (msg) => {
      setMessage(msg);
    });

    setChatSocket(socket);
  };

  const sendMessage = () => {
    if (chatSocket) {
      console.log('Sending message to the /chat namespace');
      chatSocket.emit('message', 'Hello from the chat namespace!');
    } else {
      console.log('Socket not connected');
    }
  };

  useEffect(() => {
    return () => {
    
      if (chatSocket) {
        chatSocket.disconnect();
      }
    };
  }, [chatSocket]);


  return (
    <div>
      <button onClick={connectChat}>Connect</button>
      <button onClick={sendMessage} disabled={!connected}>Send Message</button>
      <button onClick={()=>setConnected(false)}>Disconnect </button>
      <h1>{message}</h1>
    </div>
  );
}

export default App;

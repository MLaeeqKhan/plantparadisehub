import React, { useContext, useEffect, useState } from 'react'
import { getMessages } from '../apis/getMessagesApis';
import { AuthContext } from '../Context/AuthContext';

import io from 'socket.io-client';
const ENDPOINT ="http://localhost:5000";
var socketClient, selectedChatCompare;

const Messages = ({ selectedChat}) => {
  const {UserID,user} = useContext(AuthContext);
  const [messages,setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
useEffect(()=>{
if(selectedChat){
fetchMessages(selectedChat);
}
},[selectedChat]);
const fetchMessages=async(chatId)=>{
  try {
    const res=await getMessages(chatId);
    setMessages(res.data.messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
 
  }
}
useEffect(()=>{
  console.log("user:",user);
  if(user){
    socketClient = io(ENDPOINT);
    socketClient.emit('setup', user);
    socketClient.on('connectecd', () => setSocketConnected(true));
  }
  
 
},[])
  return (
    <>
    
  <p>SelectedChatID: {selectedChat}</p>
  <div  className='list-group'>
  {messages.length ? (
    messages.map((message) => {
      console.log("selectedChat:", selectedChat);
      // console.log("message.senderID:", message.senderID);
      return (
        
          <div  key={message._id} style={{ width:"200px",height:"80px",color:"white", margin:"5px",backgroundColor: UserID === message.senderID._id ? 'green' : 'aqua' }}> <p>{message.content}</p>
          <p style={{color:"black"}}>{message.senderID?.userName}</p>
          </div>
         
      );
    })
  ) : (
    <p>Currently you don't have any messages with this user</p>
  )}

  </div>
  
</>
  )
}

export default Messages

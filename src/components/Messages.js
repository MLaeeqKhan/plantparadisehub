import React, { useEffect, useState } from 'react'
import { getMessages } from '../apis/getMessagesApis';

const Messages = ({ selectedChat}) => {
  const [messages,setMessages] = useState([]);
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
  return (
    <>
    <p>SelectedChatID:{selectedChat}</p>
{messages.length?(messages.map((messages)=>(<div
  className='list-group' key={messages._id}><p> {messages.content}</p><p>{messages.senderID.userName}</p></div>))):(<p>Currently you dont't have any message with this user</p>)}
    </>
  )
}

export default Messages

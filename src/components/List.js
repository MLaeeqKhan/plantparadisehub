import React, { useContext, useEffect, useState } from 'react'
import { getChat } from '../apis/getChatApis';
import { AuthContext } from '../Context/AuthContext';

const List = ({ onSelectChat }) => {
const {UserID} = useContext(AuthContext);
const [chat,setChat]= useState([]);
useEffect(()=>{
  fetchChat()
},[])
const fetchChat=async()=>{
  const res= await getChat()
  setChat(res.data.chat);
  console.log(chat);
}
const handleChatClick = (chatId,receiverID) => {
  onSelectChat(chatId,receiverID);
};
  return (
    <>
    { chat.length?( <ul className="list-group">

    {chat.map((item) => (
           <li
                key={item._id}
                className="list-group-item"
                onClick={() => handleChatClick(item._id,item.receiverID)}
              >
                {item.receiverID.userName}
              </li>
            
          ))}

{chat.map((item) => {
   console.log('Receiver ID:', UserID);
  console.log('Receiver ID:', item.receiverID);
  console.log('User Name:', item.receiverID?.userName);
  return (
    (item.senderID === UserID || item.receiverID === UserID) && (
      <li
        key={item._id}
        className="list-group-item"
        onClick={() => handleChatClick(item._id, item.receiverID)}
      >
        {item.receiverID?.userName || 'Unknown User'}
      </li>
    )
  );
})}

        </ul>):(<p>You Have Currently Not Any Connectin!</p>) }
    </>
  )
}

export default List

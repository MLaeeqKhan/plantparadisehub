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

    {/* {chat.map((item) => (
           <li
                key={item._id}
                className="list-group-item"
                onClick={() => handleChatClick(item._id,item.receiverID)}
              >
                {item.receiverID.userName}
              </li>
            
          ))} */}

{/* Inside the second map function */}
{chat.map((item) => {
    console.log('User ID:', UserID);
    console.log('Sender ID:', item.senderID);
    console.log('Receiver ID:', item.receiverID?._id);
    console.log('User Name:', item.receiverID?.userName);
    
    var isUserInChat =false;
    isUserInChat= item.senderID === UserID || item.receiverID?._id === UserID;
    console.log('Is User in Chat:', isUserInChat);

    return (
        isUserInChat && (
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

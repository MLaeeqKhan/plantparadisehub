//List.js file
import React, { useContext, useEffect, useState } from 'react'
import { getChat } from '../apis/getChatApis';
import { AuthContext } from '../Context/AuthContext';

const List = ({ onSelectChat }) => {
const {UserID,userName} = useContext(AuthContext);
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
    console.log('UserID:', UserID);
    console.log('item.senderID:', item.senderID);
    console.log('userName:', userName);
    console.log('item.receiverID?._id:', item.receiverID?._id);
    console.log('item.receiverID?.userName:', item.receiverID?.userName); 
    
    var isUserInChat =false;
    isUserInChat= item.senderID?._id === UserID || item.receiverID?._id === UserID;
    console.log('Is User in Chat:', isUserInChat);

    return (
        isUserInChat && (
            <li
                key={item._id}
                className="list-group-item"
                //its send the chat's ID and receiverID or senderID to 'Chat' component according to comparison  
                onClick={() => handleChatClick(item._id, UserID===item.senderID?._id?  item.receiverID?._id: item.senderID?._id)}
            >
                {item.senderID._id===UserID? item.receiverID?.userName:item.senderID?.userName }
            </li>
        )
    );
})}

        </ul>):(<p>You Have Currently Not Any Connectin!</p>) }
    </>
  )
}

export default List

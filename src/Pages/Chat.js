import React, { useContext, useEffect, useState } from 'react';
import List from '../components/List';
import Messages from '../components/Messages'
import { useParams } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

const Chat = () => {
  const [message, setMessage] = useState({content:""});
  const [upDateReceiver,setUpDateReceiver]= useState();
  const params = useParams();
  const receiver = params.receiverID;
  useEffect(() => {
    console.log('receiverID:',receiver);
    setUpDateReceiver(receiver);
  }, [receiver]); 

  console.log("Chat.js ReceiverID:",receiver);
  const {UserID} = useContext(AuthContext);
  console.log("Chat.js SenderID:",UserID);

  let name, value;
  const handleInput=(e)=>{
    name = e.target.name;
    value = e.target.value;
    setMessage({...message,[name]:value});
  };
  const postData = async(e)=>{
    e.preventDefault();
    const {content} = message;
    console.log("upDateReceiver:",upDateReceiver);

    const res = await fetch("http://localhost:5000/sendMessage",{
      method:"POST",
      headers:{
        "content-type": "application/json",
      },
      body:JSON.stringify({UserID,upDateReceiver,content})
      
  });
  const response = await res.json();
  if(response){
    setMessage({content:""});
    // setChat(response);
    console.log("Chat Responce:",response);
    window.alert("Message successfully sended!");
  }
  else{
    window.alert("Error in Message sending!");
  }
};

const [selectedChat, setSelectedChat] = useState(null);

const handleSelectChat = (chatId,receiverID) => {
  console.log('receiverID:',receiverID);
  setUpDateReceiver(receiverID);
  setSelectedChat(chatId);
};
 function removeContent(params) {
  setMessage({content:""});
}
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-1">
          <List onSelectChat={handleSelectChat}/></div>
          <div className="col-2 chat-container">
            <div className='list-group'> <Messages selectedChat={selectedChat} /></div>
            <div className="texing">
              <input type="text" onChange={handleInput}
              name='content'
              value={message.content} />
              <button onClick={postData} type='submit'>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

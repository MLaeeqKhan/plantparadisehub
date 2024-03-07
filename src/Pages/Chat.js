//Chat.js file
import React, { useContext, useEffect, useState } from "react";
import List from "../components/List";
import Messages from "../components/Messages";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setReceiverId } from "../Redux/action";

const Chat = () => {
  const params = useParams();
  const receiver = params.receiverID;
  const dispatch = useDispatch();
  dispatch(setReceiverId(receiver));
  useEffect(() => {
    console.log("receiverID:", receiver);
  }, [receiver]);
  console.log("Chat.js ReceiverID:", receiver);
  const [selectedChat, setSelectedChat] = useState(null);
  

  const handleSelectChat = (chatId) => {
    setSelectedChat( chatId );
  };
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-1">
            <List onSelectChat={handleSelectChat} />
          </div>
          <div className="col-2 chat-container">
            <div className="list-group">
              {" "}
              <Messages selectedChat={selectedChat}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;

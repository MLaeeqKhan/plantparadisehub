//Chat.js file
import React, { useContext, useEffect, useState } from "react";
import List from "../components/List";
import Messages from "../components/Messages";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Chat = () => {
  const params = useParams();
  const receiver = params.receiverID;
  useEffect(() => {
    console.log("receiverID:", receiver);
  }, [receiver]);
  console.log("Chat.js ReceiverID:", receiver);
  const { UserID } = useContext(AuthContext);
  console.log("Chat.js SenderID:", UserID);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatIDReceiver,setChatIDReceiver] = useState(null)
  // setChatIDReceiver({ chatId, receiverID });

  const handleSelectChat = (chatId, receiverID) => {
    console.log("receiverID:", receiverID);
    setSelectedChat({ chatId, receiverID });
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
              <Messages selectedChat={selectedChat} receiver={receiver} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;

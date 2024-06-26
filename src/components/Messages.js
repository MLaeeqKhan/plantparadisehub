//Messages.js file
import React, { useContext, useEffect, useState, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setNotification,setLastMessage } from "../Redux/action";

import { getMessages } from "../apis/ChatApis/getMessagesApis";
import { getAllMessages } from "../apis/ChatApis/getAllMessagesApis";

import { AuthContext } from "../Context/AuthContext";


import io from "socket.io-client";
import { getNotification } from "../apis/ChatApis/getNotificationsApis";
const ENDPOINT = "http://localhost:5000";
var socketClient, selectedChatCompare;

const Messages = ({ selectedChat }) => {
  const messagesRef = useRef(null);
  const dispatch = useDispatch();
  // const latestMessage = useSelector((state) => state.lastMessage);
  const receiverId = useSelector((state)=>state.receiverId)
console.log("Message.js receiverID:",receiverId);

  const { UserID, user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({ content: "" });
  // const [upDateReceiver, setUpDateReceiver] = useState();

  const [socketConnected, setSocketConnected] = useState(false);
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMessage({ ...message, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { content } = message;
    console.log("postData receiverID:",receiverId);

    const res = await fetch("http://localhost:5000/sendMessage", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      
      body: JSON.stringify({ UserID, receiverId, content }),
    });
    const response = await res.json();
    if (socketClient) {
      console.log("socketClient receiverID:",receiverId);

      socketClient.emit("new message", response.msg, receiverId);
      fetchMessages(selectedChat);
      fetchAllMessagges();

    }
    if (response) {
      setMessage({ content: "" });
      console.log("Chat Responce:", response);
    } else {
      window.alert("Error in Message sending!");
    }
  };
  const postNotification = (notification) => {
    const res = fetch("http://localhost:5000/saveNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("Success res:", res);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("res:", res);
      });
  };
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
      // setUpDateReceiver(selectedChat);
      selectedChatCompare = selectedChat;
      fetchNotification();
      fetchAllMessagges();


    }
  }, [selectedChat]);

  useEffect(() => {
    socketClient = io(ENDPOINT);
    socketClient.emit("setup", user);
    socketClient.on("connected", () => {
      console.log("Socket connected!");
      setSocketConnected(true);
    });
  }, [user]);

  const fetchMessages = async (chatId) => {
    try {
      if (chatId) {
        const res = await getMessages(chatId);
        socketClient.emit("join chat", chatId);
        setMessages(res.data.messages);
        socketClient.emit("join chat", chatId);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const fetchAllMessagges = async () => {
    try {
      const allMessages = await getAllMessages();
      dispatch(setLastMessage(allMessages.data.messages));

      // setAllMsg(allMessages.data.messages);
    } catch (error) {
      console.error("Error in fetching allMessages", error);
    }
  };
  const fetchNotification = async () => {
    try {
      const notification = await getNotification();
      // console.log(
      //   "notification.data.notifications",
      //   notification.data.notifications
      // );
      dispatch(setNotification(notification.data.notifications));
    } catch (error) {
      console.error("Error in fetching Notifications",error);
    }
  };
  useEffect(() => {
    socketClient.on("message Received", (newMessageRecieved) => {
      if (
        selectedChat &&
        selectedChatCompare === newMessageRecieved.createdChatID
      ) {
        console.log("newMessageRecieved in Messages.js:", newMessageRecieved);
        setMessages([...messages, newMessageRecieved]);
        fetchAllMessagges();

      } else if (selectedChatCompare !== newMessageRecieved.createdChatID) {
        console.log("  notification");
        // dispatch(setNotification(newMessageRecieved));
        postNotification(newMessageRecieved);
        fetchNotification();
        fetchAllMessagges();

      }
    });
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, selectedChat]);
 

  return (
    <>
      <p>SelectedChatID: {selectedChat}</p>
      <div
        ref={messagesRef}
        className="list-group"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {messages && messages.length ? (
          messages.map((message) => {
            return (
              <div
                key={message?._id}
                style={{
                  alignSelf:
                    UserID === message?.senderID?._id
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                {message?.senderID && (
                  <div
                    style={{
                      width: "auto",
                      height: "auto",
                      color: "white",
                      margin: "5px",
                      borderRadius: "20px",
                      padding: "5px",
                      backgroundColor:
                        UserID === message.senderID._id ? "green" : "aqua",
                      alignSelf:
                        UserID === message.senderID._id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <p>{message.content}</p>
                    {/* <p style={{ color: "black" }}>{message.senderID.userName}</p> */}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>Currently you don't have any messages with this user</p>
        )}
      </div>
      {selectedChat || receiverId ? (
        <div className="texing">
          <input
            type="text"
            onChange={handleInput}
            name="content"
            value={message.content}
          />
          <button onClick={postData} type="submit">
            Send
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Messages;

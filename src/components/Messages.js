//Messages.js file
import React, { useContext, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../Redux/action";

import { getMessages } from "../apis/getMessagesApis";
import { AuthContext } from "../Context/AuthContext";

import io from "socket.io-client";
import { getNotification } from "../apis/getNotificationsApis";
const ENDPOINT = "http://localhost:5000";
var socketClient, selectedChatCompare;

const Messages = ({ selectedChat, receiver }) => {
  const messagesRef = useRef(null);
  const dispatch = useDispatch();

  const { UserID, user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({ content: "" });
  const [upDateReceiver, setUpDateReceiver] = useState();

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

    const res = await fetch("http://localhost:5000/sendMessage", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ UserID, upDateReceiver, content }),
    });
    const response = await res.json();
    if (socketClient) {
      socketClient.emit("new message", response.msg, upDateReceiver);
      fetchMessages(selectedChat.chatId);
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
    if (selectedChat && selectedChat.chatId) {
      fetchMessages(selectedChat.chatId);
      setUpDateReceiver(selectedChat.receiverID);
      selectedChatCompare = selectedChat.chatId;
      fetchNotification();
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
  const fetchNotification = async () => {
    try {
      const notification = await getNotification();
      console.log(
        "notification.data.notifications",
        notification.data.notifications
      );
      dispatch(setNotification(notification.data.notifications));
    } catch (error) {
      console.error("Error in fetching Notifications",error);
    }
  };
  useEffect(() => {
    socketClient.on("message Received", (newMessageRecieved) => {
      if (
        selectedChat &&
        selectedChat.chatId &&
        selectedChatCompare === newMessageRecieved.createdChatID
      ) {
        console.log("newMessageRecieved in Messages.js:", newMessageRecieved);
        setMessages([...messages, newMessageRecieved]);
      } else if (selectedChatCompare !== newMessageRecieved.createdChatID) {
        console.log("  notification");
        // dispatch(setNotification(newMessageRecieved));
        postNotification(newMessageRecieved);
        fetchNotification();
      }
    });
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, selectedChat]);
  useEffect(() => {
    if (receiver) {
      setUpDateReceiver(receiver);
      console.log("Receiver in Messages:", receiver);
    }
  }, [receiver]);

  return (
    <>
      <p>SelectedChatID: {selectedChat && selectedChat.chatId}</p>
      <div
        ref={messagesRef}
        className="list-group"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {messages.length ? (
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
      {(selectedChat && selectedChat.receiverID) || receiver ? (
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

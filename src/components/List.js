//List.js file
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../apis/ChatApis/getChatApis";
import { getAllMessages } from "../apis/ChatApis/getAllMessagesApis";

import { AuthContext } from "../Context/AuthContext";
import { getNotification } from "../apis/ChatApis/getNotificationsApis";
import { removeNotification } from "../apis/ChatApis/removeNotificationApis";
import { setLastMessage, setNotification } from "../Redux/action";

const List = ({ onSelectChat }) => {
  const { UserID } = useContext(AuthContext);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const latestMsg = useSelector((state) => state.lastMessage);

  const [chat, setChat] = useState([]);
  // const [allMsg, setAllMsg] = useState([]);
  useEffect(() => {
    fetchChat();
    fetchAllMessagges();
    fetchNotification();
  }, []);
  const fetchChat = async () => {
    const res = await getChat();
    setChat(res.data.chat);
    // console.log(chat);
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
      console.log(
        "notification.data.notifications",
        notification.data.notifications
      );
      dispatch(setNotification(notification.data.notifications));
    } catch (error) {
      console.error("Error in fetching Notifications", error);
    }
  };
  const handleChatClick = (chatId, receiverID) => {
    onSelectChat(chatId, receiverID);
    deleteNotification(chatId);
  };
  const deleteNotification = (chatId) => {
    removeNotification(chatId);
  };
  return (
    <>
      {chat.length ? (
        <ul className="list-group">
          {chat.map((item) => {
            const count = notifications.filter(
              (notification) =>
                notification.createdChatID === item._id &&
                notification.senderID !== UserID
            ).length;
            const lastMessage = latestMsg
              .filter((msg) => msg.createdChatID === item._id)
              .pop();
            var isUserInChat = false;
            isUserInChat =
              item.senderID?._id === UserID || item.receiverID?._id === UserID;

            return (
              isUserInChat && (
                <li
                  key={item._id}
                  className="list-group-item"
                  //its send the chat's ID and receiverID or senderID to 'Chat' component according to comparison
                  onClick={() =>
                    handleChatClick(
                      item._id,
                      UserID === item.senderID?._id
                        ? item.receiverID?._id
                        : item.senderID?._id
                    )
                  }
                >
                  {item.senderID._id === UserID
                    ? item.receiverID?.userName
                    : item.senderID?.userName}
                    <div>
                      <div className="lastMessageCount">
                  <span className="lastMessage">
                    {" "}
                    {lastMessage && lastMessage.content}
                  </span>
                  {/* if some notifications not have the same senderID and UserID then its show the notification */}
                  {notifications.some(
                    (notification) => notification.senderID !== UserID
                  ) &&
                    count > 0 && <div className="count">{count}</div>}
                    </div>
                    </div>
                </li>
              )
            );
          })}
        </ul>
      ) : (
        <p>You Have Currently Not Any Connectin!</p>
      )}
    </>
  );
};

export default List;

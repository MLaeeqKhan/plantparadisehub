//List.js file
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../apis/getChatApis";
import { AuthContext } from "../Context/AuthContext";
import { getNotification } from "../apis/getNotificationsApis";
import { setNotification } from "../Redux/action";
const List = ({ onSelectChat }) => {
  const { UserID } = useContext(AuthContext);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const [chat, setChat] = useState([]);
  useEffect(() => {
    fetchChat();
    fetchNotification();
  }, []);
  const fetchChat = async () => {
    const res = await getChat();
    setChat(res.data.chat);
    // console.log(chat);
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
    // dispatch(removeNotification(chatId));
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
                  {notifications.some(
                    (notification) => notification.senderID !== UserID
                  ) &&
                    count > 0 && <span>{count}</span>}
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

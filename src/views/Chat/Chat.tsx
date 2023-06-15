import React from "react";
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "store/store";
import { getAllMessages, getAllUsers } from "store/chat/chatActions";
import { SendInput } from "views/SendInput";
import socket from "utils/socket";
import { IMessages } from "utils/types";

import styles from "./ChatStyles.module.scss";

export const Chat = () => {
  const { id } = useParams();
  const messagesRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.auth.userName);

  const [users, setUsers] = React.useState<string[]>([]);
  const [userName, setUserName] = React.useState<string>(name);
  const [messages, setMessages] = React.useState<IMessages[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");

  React.useEffect(() => {
    setUserName(name);
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const [usersPayload, messagesPayload] = await Promise.all([
        dispatch(getAllUsers(id as string)),
        dispatch(getAllMessages(id as string)),
      ]);
      setUsers(usersPayload.payload);
      setMessages(messagesPayload.payload);
    }

    fetchData();
  }, [id]);

  React.useEffect(() => {
    const handleMessageUpdate = (updatedMessages: IMessages[]) => {
      setMessages(updatedMessages);
    };

    socket.on("SET_NEW_USERS", setUsers);
    socket.on("SEND_MESSAGE", handleMessageUpdate);

    return () => {
      socket.off("SET_NEW_USERS", setUsers);
      socket.off("SEND_MESSAGE", handleMessageUpdate);
    };
  }, []);

  React.useEffect(() => {
    messagesRef.current?.scroll({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit("SEND_MESSAGE", { inputValue, userName, id });
    setMessages([...messages, { message: inputValue, userName }]);
    setInputValue("");
  };

  const onKeyPress = ({ key }: React.KeyboardEvent<Element>) => {
    if (key !== "Enter") return;
    sendMessage();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.infoBlock}>
        <header className={styles.roomHeader}>Комната: {id}</header>
        <span className={styles.onlineCounter}>
          Онлайн ({users?.length || 0}) :
        </span>
        <div className={styles.usersContainer}>
          {users?.map((user, index) => {
            return (
              <div key={user + index} className={styles.userName}>
                {user}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.messagesBlock}>
        <div ref={messagesRef} className={styles.messages}>
          <div className={styles.messagesContainer}>
            {messages.map((item, index) => {
              return (
                <div
                  className={item.userName === userName ? styles.right : ""}
                  key={index}
                >
                  <div
                    className={
                      item.userName === userName
                        ? styles.messageRight
                        : styles.messageLeft
                    }
                  >
                    {item.message}
                  </div>
                  <div
                    className={
                      item.userName === userName
                        ? styles.messageAuthorRight
                        : styles.messageAuthorLeft
                    }
                  >
                    {item.userName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <SendInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={sendMessage}
          onKeyPress={(e: React.KeyboardEvent<Element>) => onKeyPress(e)}
        />
      </div>
    </div>
  );
};

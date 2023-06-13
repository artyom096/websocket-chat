import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import SendInput from "../SendInput";
import socket from "../../utils/socket";
import { getAllMessages, getAllUsers } from "../../store/chatSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { IMessages } from "../../utils/types";
import "./ChatStyles.scss";

const Chat = () => {
  const { id } = useParams();
  const messagesRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const name = useSelector((state: RootState) => state.auth.userName);

  const [users, setUsers] = React.useState<string[]>([]);
  const [userName, setUserName] = React.useState<string>(name);
  const [messages, setMessages] = React.useState<IMessages[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");

  React.useEffect(() => {
    setUserName(name);
  }, []);

  React.useEffect(() => {
    dispatch(getAllUsers(id as string)).then(({ payload }) =>
      setUsers(payload)
    );
    dispatch(getAllMessages(id as string)).then(({ payload }) =>
      setMessages(payload)
    );
  }, []);

  React.useEffect(() => {
    socket.on("SET_NEW_USERS", (users) => {
      setUsers(users);
    });

    socket.on("SEND_MESSAGE", (messages) => {
      setMessages(messages);
    });
  }, []);

  React.useEffect(() => {
    messagesRef.current?.scroll(0, messagesRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = () => {
    socket.emit("SEND_MESSAGE", { inputValue, userName, id });
    setMessages([...messages, { message: inputValue, userName }]);
    setInputValue("");
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<Element>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatContainer">
      <div className="infoBlock">
        <header className="roomHeader">Комната: {id}</header>
        <span className="onlineCounter">Онлайн ({users?.length || 0}) :</span>
        <div className="usersContainer">
          {users?.map((user, index) => {
            return (
              <div key={user + index} className="userName">
                {user}
              </div>
            );
          })}
        </div>
      </div>
      <div className="messagesBlock">
        <div
          ref={messagesRef}
          style={{
            padding: "10px 10px 0 10px",
            maxHeight: "calc(100% - 35px)",
            overflowY: "auto",
          }}
        >
          <div className="messagesContainer">
            {messages.map((item, index) => {
              return (
                <div
                  className={item.userName === userName ? "right" : ""}
                  key={index}
                >
                  <div
                    className={
                      item.userName === userName
                        ? "messageRight"
                        : "messageLeft"
                    }
                  >
                    {item.message}
                  </div>
                  <div
                    className={
                      item.userName === userName
                        ? "messageAuthorRight"
                        : "messageAuthorLeft"
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
          onKeyPress={(e: React.KeyboardEvent<Element>) =>
            handleInputKeyPress(e)
          }
        />
      </div>
    </div>
  );
};

export default Chat;

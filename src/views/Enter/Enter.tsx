import React from "react";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "store/store";
import { joinNewUser } from "store/auth/authActions";
import { auth } from "store/auth/authSlice";
import { InputGroup } from "components/InputGroup";
import { Button } from "components/Button";
import socket from "utils/socket";

import styles from "./EnterStyles.module.scss";

export const Enter = () => {
  const [userName, setUserName] = React.useState("");
  const [roomID, setRoomID] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  React.useEffect(() => {
    if (!isAuth) navigate("/");
    else navigate(`/chat/${roomID}`);
  }, [isAuth]);

  const joinChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !roomID) return;

    try {
      setLoading(true);
      dispatch(joinNewUser({ roomID, userName }));
      dispatch(auth({ roomID, userName }));
      socket.emit("JOINED", { roomID, userName });
    } catch (error) {
      navigate("/wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.enterContainer}>
      <form className={styles.form} onSubmit={joinChat}>
        <div className={styles.inputGroupContainer}>
          <InputGroup
            placeholder="ROOM ID"
            name="Room"
            onChange={(e) => setRoomID(e.target.value)}
            value={roomID}
          />
          <InputGroup
            name="Name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <Button disabled={loading}>{loading ? "ВХОД..." : "ВОЙТИ"}</Button>
      </form>
    </div>
  );
};

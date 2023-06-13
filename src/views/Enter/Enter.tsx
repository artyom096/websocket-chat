import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";
import socket from "../../utils/socket";
import { auth, joinNewUser } from "../../store/authSlice";
import { RootState } from "../../store/store";
import "./EnterStyles.scss";

const Enter = () => {
  const [userName, setUserName] = React.useState<string>("");
  const [roomID, setRoomID] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  React.useEffect(() => {
    !isAuth ? navigate("/") : navigate(`/chat/${roomID}`);
  }, [isAuth]);

  const joinChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userName && roomID) {
      try {
        setLoading(true);
        await dispatch(joinNewUser({ roomID, userName }));
      } catch (error) {
        navigate("/wrong");
      } finally {
        setLoading(false);
      }
      dispatch(auth({ roomID, userName }));
      socket.emit("JOINED", { roomID, userName });
    }
  };

  return (
    <div className="enterContainer">
      <form className="form" onSubmit={(e) => joinChat(e)}>
        <div className="inputGroupContainer">
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

export default Enter;

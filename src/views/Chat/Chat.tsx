import React from "react"
import "./ChatStyles.scss"
import SendInput from "../SendInput"
import { useParams } from "react-router"
import socket from "../../server/socket"
import { useDispatch, useSelector } from "react-redux"
import { getAllMessages, getAllUsers } from "../../store/ChatSlice"
import { RootState, useAppDispatch } from "../../store/store"
// messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
const Chat = () => {

    const { id } = useParams()

    const dispatch = useAppDispatch()

    const [users, setUsers] = React.useState<string[]>([])
    const [messages, setMessages] = React.useState<string[]>([])
    const [inputValue, setInputValue] = React.useState<string>("")

    React.useEffect(() => {
        dispatch(getAllUsers(id as string)).then(({payload}) => setUsers(payload))
        dispatch(getAllMessages(id as string)).then(({payload}) => setMessages(payload))
    }, [])

    React.useEffect(() => {
        socket.on("SET_NEW_USERS", (users) => {
            setUsers(users)
        })

        socket.on("SEND_MESSAGE", (messages) => {
            setMessages(messages)
        })
    }, [])

    const sendMessage = () => {
        socket.emit("SEND_MESSAGE", ({inputValue, id}))
        setMessages([...messages, inputValue])
        setInputValue("")
    }

    return (
        <div className="ChatContainer">
            <div className="InfoBlock">
                <header className="RoomHeader">
                    Комната номер {id}
                </header>
                <span className="OnlineCounter">Онлайн ({users?.length || 0}) :</span>
                <div className="UsersContainer">
                    {users?.map((user, index) => {
                        return <div key={user + index} className="UserName">{user}</div>
                    })}
                </div>
            </div>

            <div className="MessagesBlock">
                <div className="MessagesContainer">
                    {messages.map((item, index) => {
                        return (
                            <div key={item + index}>
                                <div className="MessageLeft">{item}</div>
                            </div>
                        )
                    })}
                </div>
                <SendInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onClick={sendMessage}
                />
            </div>
        </div>
    )
}

export default Chat
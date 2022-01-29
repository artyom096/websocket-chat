import React from "react"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import "./ChatStyles.scss"
import SendInput from "../SendInput"
import socket from "../../server/socket"
import { getAllMessages, getAllUsers } from "../../store/ChatSlice"
import { RootState, useAppDispatch } from "../../store/store"
import { IMessages } from "../../utils/types"

const Chat = () => {

    const { id } = useParams()
    const messagesRef: React.RefObject<HTMLDivElement> = React.useRef(null)

    const dispatch = useAppDispatch()
    const name = useSelector((state: RootState) => state.auth.userName)

    const [users, setUsers] = React.useState<string[]>([])
    const [userName, setUserName] = React.useState<string>(name)
    const [messages, setMessages] = React.useState<IMessages[]>([])
    const [inputValue, setInputValue] = React.useState<string>("")

    React.useEffect(() => {
        setUserName(name)
    }, [])

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

    React.useEffect(() => {
        messagesRef.current && messagesRef.current.scroll(0, messagesRef.current.scrollHeight)
    }, [messages])

    const sendMessage = (e?: any) => {
        if(e.key === "Enter" || !e){
            e.preventDefault()
            socket.emit("SEND_MESSAGE", ({inputValue, userName, id}))
            setMessages([...messages, {message: inputValue, userName}])
            setInputValue("")
        }
    }

    return (
        <div className="ChatContainer">
            <div className="InfoBlock">
                <header className="RoomHeader">
                    Комната: {id}
                </header>
                <span className="OnlineCounter">Онлайн ({users?.length || 0}) :</span>
                <div className="UsersContainer">
                    {users?.map((user, index) => {
                        return <div key={user + index} className="UserName">{user}</div>
                    })}
                </div>
            </div>
            <div className="MessagesBlock">
                <div ref={messagesRef} style={{padding: "10px 10px 0 10px", maxHeight: "calc(100% - 35px)", overflowY: "auto"}}>
                    <div className="MessagesContainer">
                        {messages.map((item, index) => {
                            return (
                                <div className={item.userName === userName ? "right" : ""} key={index}>
                                    <div className={
                                            item.userName === userName
                                            ? "MessageRight"
                                            : "MessageLeft"
                                        }>
                                            {item.message}
                                        </div>
                                        <div className={
                                            item.userName === userName
                                            ? "MessageAuthorRight"
                                            : "MessageAuthorLeft"
                                        }>{item.userName}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <SendInput
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onClick={sendMessage}
                        onKeyPress={(e: any) => sendMessage(e)}
                    />
                </div>
            </div>
    )
}

export default Chat
import React from "react"
import "./ChatStyles.scss"
import SendInput from "../SendInput"
import { useParams } from "react-router"
import socket from "../../server/socket"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getAllUsers } from "../../store/AuthSlice"
// messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
const Chat = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const [users, setUsers] = React.useState<string[]>()

    React.useEffect(() => {
        const getUsers = async () => {
            const {data} = await axios.get(`/rooms/${id}`)
            setUsers(data)
        }

        getUsers()

        dispatch(getAllUsers(id as string))
    }, [])

    React.useEffect(() => {
        socket.on("SET_NEW_USERS", (users) => {
            setUsers(users)
        })
    }, [])

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
                    <div>
                        <div className="MessageLeft">skmwkdms</div>
                    </div>
                    <div className="MessageRightContainer">
                        <div className="MessageRight">smjcnwkxsm</div>
                    </div>
                    <div className="MessageRightContainer">
                        <div className="MessageRight">HELLO</div>
                    </div>
                </div>
                <SendInput />
            </div>
        </div>
    )
}

export default Chat
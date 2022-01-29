const express = require('express');
const cors = require("cors")
const dotenv = require("dotenv")

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

dotenv.config()

const corsOptions = {
    "origin": "*"
  }

const PORT = process.env.PORT || 5000
const rooms = new Map()

app.use(express.json())
app.use(cors(corsOptions))

app.get('/rooms/:id', (req, res) => {
    const { id } = req.params
    let users = []

    if(rooms.get(id)){
      users = [...rooms.get(id).get("users").values()]
    } else {
      users = []
    }

    res.json(users)
})

app.get('/messages/:id', (req, res) => {
  const { id } = req.params
  let messages = []

  if(rooms.get(id)){
    messages = rooms.get(id).get("messages")
  } else {
    messages = []
  }

  res.json(messages)
})

app.post('/auth', (req, res) => {
    const { roomID } = req.body;
    if (!rooms.has(roomID)) {
      rooms.set(
        roomID,
        new Map([
          ['users', new Map()],
          ['messages', []],
        ]),
      );
    }
    res.send();
});

io.on("connection", (socket) => {
    socket.on("JOINED", ({roomID, userName}) => {
        socket.join(roomID)
        if(rooms.get(roomID)){
          rooms.get(roomID).get("users").set(socket.id, userName)
          const users = [...rooms.get(roomID).get("users").values()]
          socket.to(roomID).emit("SET_NEW_USERS", users);
        }
    })

    socket.on("SEND_MESSAGE", ({inputValue, userName, id}) => {
      if(rooms.get(id)){
        rooms.get(id).get("messages").push({message: inputValue, userName})
        const messages = rooms.get(id).get("messages")
        socket.to(id).emit("SEND_MESSAGE", messages)
      }
    })

    socket.on("disconnect", () => {
      rooms.forEach((value, roomID) => {
        if (value.get('users').delete(socket.id)) {
          const users = [...value.get('users').values()];
          socket.to(roomID).emit('SET_NEW_USERS', users);
        }
      });
    });
})

server.listen(PORT, (err) => {
    if(err){
        throw Error(err)
    }
    console.log(`Server has been started on PORT${PORT}`)
})
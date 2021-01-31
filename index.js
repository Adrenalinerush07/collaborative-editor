const express = require("express");
const socket = require("socket.io");
const path = require("path");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./src/utils/users");

const PORT = process.env.PORT || 8000;

const app = express();


const publicDirectoryPath = path.join(__dirname, "/public");

app.use(express.static(publicDirectoryPath));

let server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("User Joined");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    callback();
  });

  // updating html code to users in room
  socket.on("htmlCode", (val1) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("htmlCode", val1);
  });

  // updating css code to users in room
  socket.on("cssCode", (val2) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("cssCode", val2);
  });

  // updating js code in users in room
  socket.on("jsCode", (val3) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("jsCode", val3);
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      // io.emit('you are done')
    }
  });
});


app.get("/jobs", (req,res)=>{
  return res.render('job',{
      title:"Home Page"
  });
});

app.get("/books", (req,res)=>{
  return res.render('books',{
      title:"Home Page"
  });
});

app.get("/codetogether", (req,res)=>{
  return res.render('job',{
      title:"Home Page"
  });
});

app.get("/dashboard", (req,res)=>{
  return res.render('job',{
      title:"Home Page"
  });
});




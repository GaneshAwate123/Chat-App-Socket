const socket = io("http://192.168.0.139:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
// const targetUserInput = document.getElementById("targetUser");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};


const getRoomAndName = () => {
  const roomName = prompt("Enter room name");
  const name = prompt("Enter your name to join");
  return { roomName, name };
};

const { roomName, name } = getRoomAndName();
socket.emit("join-room", roomName, name);

socket.on("user-joined", (userName) => {
  append(`${userName} joined the chat`, "right");
});

socket.on("receive", (data) => {
  if (data.name !== name) {
    
    append(`${data.name} : ${data.message}`, "left");
  }
});

socket.on("left", (userName) => {
  append(`${userName} left the chat`, "right");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  // const targetUser = targetUserInput.value;
  append(`you: ${message}`, "right");
  socket.emit("send", message );
  messageInput.value = "";
});





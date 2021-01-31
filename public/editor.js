const socket = io.connect("/");

// const editor = document.querySelector("#editor");

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

const html = document.querySelector("#htmlCode")
const css = document.querySelector("#cssCode")
const js = document.querySelector("#jsCode")
// const pre = document.querySelector("#preview-window")


document.getElementById("htmlCode").addEventListener("keyup",run);
document.getElementById("cssCode").addEventListener("keyup",run);
document.getElementById("jsCode").addEventListener("keyup",run);
// document.getElementById("preview-window").addEventListener("keyup",run);

function run() {
  var htmlCode = document.getElementById("htmlCode").value;
  socket.emit("htmlCode", htmlCode)
  var cssCode = "<style>" + document.getElementById("cssCode").value + "</style>";
  socket.emit("cssCode", cssCode)
  var jsCode= document.getElementById("jsCode").value;
  socket.emit("jsCode", jsCode)

  var preview = document.getElementById("preview-window");

  preview.contentDocument.body.innerHTML = htmlCode + cssCode ;
  preview.contentWindow.eval(jsCode);


}


socket.on("htmlCode", (val1) => {
  html.value = val1;
});

socket.on("cssCode", (val2) => {
  css.value = val2;
});

socket.on("jsCode", (val3) => {
  js.value = val3;
});


socket.emit('join', {username, room}, (error) => {
  if(error){
    alert(error)
    location.href = '/'
  }
})  
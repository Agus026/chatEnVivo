console.log(funciona)

const socket = io();
//Crear una instancio Socket.io desde el cliente 

//Crear una variable para guardar al usuario del chat

let user;

const chatBox = document.getElementById("chatBox");

//Utilizamos Sweet Alet para el mensaje de bienvenida.

//Swal es un objeto que nos permite usar los metodos de la libreria
//Fire nos permite configurar la alerta.

Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa un usuario",
    inputValidator: (value) => {
        return !value && "Nesecitas escribir un nombre"
    },
    allowOutsideClick: false ,
}).then(result =>{
    user = result.value;
})


chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        //trim nos permite sacar los espacios de un mensaje al final y al inicio
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = ""; 
        }
    }
})


socket.on("menssagesLogs" , data =>{
    const log = document.getElementById("messagesLogs")
    let message;
    data.forEach(message => {
        message = message + `${message.user} dice: ${message.message} <br> `
    });
    log.innerHTML = message;
})
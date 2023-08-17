"use strict"
const socket = io();

const nickName = document.querySelector("#nickName")
const chatList = document.querySelector(".chattingList")
const chatInput = document.querySelector(".chatReoChattingTextSpace")
const sendButton = document.querySelector(".chatReoChattingBtn")

//입력 시 닉네임, 메세지로 채팅 보내기
sendButton.addEventListener("click",()=>{
    const param = {
        name: nickName.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
})


socket.on("chatting", (data)=>{
    console.log(data)
})


console.log(socket)
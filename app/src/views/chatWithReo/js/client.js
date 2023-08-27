// client.js
const dbemail = "280615testemail"

let questionSign = 0;
let diagnoseSign = 0;

async function sendChatToServer(chatRoomID,email,bubbleForm,value, diagnose, question) {
    // 채팅 데이터 생성
    if (disablePoint == 1){
        return;
    }
    const chatData = {
        chatRoomID: chatRoomID,
        timeStamp: new Date().toISOString(),
        email: email,
        bubbleForm: bubbleForm,
        value: value,
        diagnose: diagnose,
        question: question
    };
    
    // fetch를 사용하여 서버에 POST 요청 보내기
    try {
        const response = await fetch('/dbput/chatuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatData)  // 객체를 JSON 문자열로 변환
        });
        
        if (response.ok) {
            const jsonResponse = await response.json();  // 서버의 응답을 JSON으로 파싱
        } else {
            console.log('Server responded with status:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function fetchChatDataFromServer(chatRoomID) {
  try {
    const response = await fetch(`/dbimport/getChatData/${chatRoomID}`);

    if (response.ok) {
      const { chats } = await response.json();
      console.log('Received chat data:', chats);
      console.log(chats[0])
      for (let i = 0; i < chats.length; i++){
          chattingPush(bubForm=chats[i].bubbleForm,text=chats[i].value)
      }
      chatListPrinter(chatList)
    } else {
      console.log('Server responded with status:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
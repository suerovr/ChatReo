




async function sendChatToServer(chatRoomID,email,bubbleForm,value, diagnose, question) {
    // 채팅 데이터 생성
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
            console.log('Server Response:', jsonResponse);
        } else {
            console.log('Server responded with status:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }

}

function executeSendChatToServer() {
    const chatRoomID = "someChatRoomID";
    const email = "somdfdffcom";
    const bubbleForm = "someBubbleForm";
    const value = "someValue";
    const diagnose = "someDiagnose";
    const question = "someQuestion";

    sendChatToServer(chatRoomID, email, bubbleForm, value, diagnose, question);
}

executeSendChatToServer()

async function fetchImportChat(chatRoomID, email) {
  try {
    const response = await fetch(`/dbimport/getChatData/${chatRoomID}?email=${email}`, {
      method: 'GET'
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Chats imported:", data.chats);
    } else {
      console.log("Server responded with status:", response.status);
    }

  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// 함수 실행
fetchImportChat("someChatRoomID", "somdfdffcom");

async function fetchUserDataItem(email, ChatRoomID, attributeName) {
    try {
        const response = await fetch(`/dbget/userDataItem?email=${encodeURIComponent(email)}&ChatRoomID=${encodeURIComponent(ChatRoomID)}&attributeName=${encodeURIComponent(attributeName)}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Received user data item:', data.data);
        } else {
            console.log('Server responded with status:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchUserDataItem('example@example.com', 'chat1234', '생년월일');  // 예시 호출

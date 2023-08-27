$(document).ready(function () {
  $('#loading').hide();
});

const api_key = "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"

messages = [
  { role: 'system', content: '너는 반려동물을 키우는 사용자들에게 질병 이름을 맞추고 질병을 진단해주는 친절한 의사 닥터 레오야.' }
]

let data = {
  model: 'gpt-3.5-turbo',
  temperature: 0.5,
  n: 1,
  messages: messages,
}

async function sendUserDataToServer(petData
) {
  // 사용자 데이터 생성
  const userData = petData

  try {
    // 서버에 POST 요청을 보냅니다.
    const response = await fetch('/dbput/ChatUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)  // 객체를 JSON 문자열로 변환
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

function chatGPT(text) {
  messages[0] = { role: 'system', content: '너는 반려동물을 키우는 사용자들에게 여러가지 정보를 제공해주는 친절한 의사 닥터 레오야.' }
  $('#loading').show(); 

  $.ajax({
    url: "https://api.openai.com/v1/chat/completions",
    method: 'POST',
    headers: {
      Authorization: "Bearer " + api_key,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  }).then(function (response) {
    $('#loading').hide();
    questionSign = 1;
    addGPTChattingBubble(response.choices[0].message.content)
    questionSign = 0;
  });
}

function diagGPT() {
  messages[0] = { role: 'system', content: '너는 반려동물을 키우는 사용자들에게 의심 질병을 맞추고 솔루션을 제공하는 친절한 의사 닥터 레오야. 너는 품종, 성별, 생일, 과거 병력 등의 질문을 우선적으로 물어봐. 그리고 반려동물의 어느 부분을 진단받고 싶은지 물어본 후에, 마지막에 의심 질환과 솔루션을 말해주는게 너의 역할이야. 과거 병력을 물어본 다음, 진단 받고 싶은 부분도 물어봐. 그리고 추가적으로 사용자가 부담을 가지지 않을 만큼 질문을 몇가지 해도 좋아. 마지막에는 의심 질환과 솔루션을 꼭 알려줘야하는데, 알려줄때는 얻은 정보를 토대로 "종 : (고양이 또는 강아지)", "품종 : ~", "성별 : 남아", "생년월일 : 20년 03월 20일", "과거 병력 : ~","의심 질환 : ~", "이상 : ~ 이상", "솔루션 : ~~~"까지 이런식으로 답변으로 마무리해줘야해. 마지막 진단엔 반드시 종, 품종, 성별, 생년월일, 과거 병력, 의심 질환,이상, 솔루션까지 8가지가 object 형식으로 들어가야해. 반드시 오브젝트 형식으로 정보를 알려주는게 필요해.'}
  $('#loading').show();

  $.ajax({
    url: "https://api.openai.com/v1/chat/completions",
    method: 'POST',
    headers: {
      Authorization: "Bearer " + api_key,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  }).then(function (response) {
    $('#loading').hide();
    
    const RSP = response.choices[0].message.content
    if ((RSP.indexOf("질환:")!=-1 )||(RSP.indexOf("솔루션 :")!=-1)||(RSP.indexOf("월일:")!=-1)){
      emphasizeDisable = 1;
      diagnoseSign = 1;
      addGPTChattingBubble(RSP)
      STOptionFnc(petDiagnoseCompleteSLT)
      emphasizeDisable = 0;
      diagnoseSign = 0;
      const extractedInformation = extractKeysWithVariations(parseCategory(RSP),keysWithVariations)
      extractedInformation.ChatRoomID = dbchatRoomID
      extractedInformation.gpt솔루션 = RSP
      extractedInformation.email = dbemail
      console.log(extractedInformation)
      sendUserDataToServer(extractedInformation)
      CP = "추가 질문"
    } else {
      addGPTChattingBubble(RSP)
      CP = "지금부터 진단 GPT에게 맡긴다 모드"
    }
  });
}
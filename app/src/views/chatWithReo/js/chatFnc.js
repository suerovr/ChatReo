const chattingName = document.querySelector("#chattingName")
const displayContainer = document.querySelector(".displayContainer")
const chatInput = document.querySelector(".chatReoChattingTextSpace")
const sendButton = document.querySelector(".chatReoChattingBtn")

const USERCHATBOX = "userChattingBox"
const USERCHATTEXT = "userChattingText"
const GPTCHATBOX = "gptChattingBox"
const GPTCHATTEXT = "gptChattingText"
const GPTCHATHR = "gptChattingHr"
const GPTOPTIONBTN = "gptOptionBtns"

const GPTIMGSRC = "/chatReoImage/chatReoGPTProfile.svg"

let recentSpeaker = ""

const emphasizeKey = 
['당신의 반려동물의 건강 상태를 진단',
 '해당 질병에 대해 도움',
'원하시는 모드를 선택',
'질문에 대한 답변',
'이미지 진단 모드',
'사진을 촬영',
'업로드']

//displayContainer스크롤 맨아래로 내리기
function displayContainerScrollTop(){
    displayContainer.scrollTop = displayContainer.scrollHeight;
}

//user 말풍선 만들기
function addUserChattingBubble(text){
    if (text == ""){
        return
    }
    const boxDiv = document.createElement("div");
    const textDiv = document.createElement("div");

    boxDiv.classList.add(USERCHATBOX)
    textDiv.innerText = text;
    textDiv.classList.add(USERCHATTEXT)

    displayContainer.appendChild(boxDiv)
    boxDiv.appendChild(textDiv)
    chatInput.value = "";
    
    recentSpeaker = "user";

    displayContainerScrollTop()
}

//gpt말풍선 강조
function emphasizeKeywords(div){
    const text = div.innerHTML;
    const newText = emphasizeKey.reduce((text, keyword)=>{
        const emphasizedText = `<span class="emphasizedText">${keyword}</span>`;
        return text.replace(new RegExp(keyword,'g'), emphasizedText);

    },text)
    div.innerHTML = newText;
}

//gpt대가리 만들기
function gptHeadChecker(boxDiv){
    if (recentSpeaker != "gpt"){
        const gptProfileDiv = document.createElement("div");
        const gptImgElement = document.createElement("img");
        
        gptProfileDiv.classList.add("gptProfilePosition")
        gptImgElement.src = GPTIMGSRC;
        gptImgElement.alt = "gpt얼굴"
        
        boxDiv.appendChild(gptProfileDiv)
        gptProfileDiv.appendChild(gptImgElement);
    }
}

//gpt말풍선 만들기
function addGPTChattingBubble(text){


    const boxDiv = document.createElement("div");
    const textDiv = document.createElement("div");

    boxDiv.classList.add(GPTCHATBOX)
    textDiv.innerText = text;
    textDiv.classList.add(GPTCHATTEXT)

    displayContainer.appendChild(boxDiv)

    gptHeadChecker(boxDiv);

    boxDiv.appendChild(textDiv)
    emphasizeKeywords(textDiv)
    recentSpeaker = "gpt";

    displayContainerScrollTop()
}


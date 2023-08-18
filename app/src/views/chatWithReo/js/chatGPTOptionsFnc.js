const hrLine = document.createElement("hr");
hrLine.classList.add(GPTCHATHR)

//맨첨에 나오는 선택지
function chatModeChooseSLT(textDiv){
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    btn1.classList.add(GPTOPTIONBTN, "questionMode")
    btn2.classList.add(GPTOPTIONBTN, "imageDiagnose")
    btn3.classList.add(GPTOPTIONBTN, "chatWithGPT")
    btn1.innerText = "질문모드"
    btn2.innerText = "이미지 진단 모드"
    btn3.innerText = "대화만 할래요"
    textDiv.innerText = "원하시는 모드를 선택해 주세요!"

    textDiv.appendChild(hrLine)
    
    emphasizeKeywords(textDiv)

    textDiv.appendChild(btn1)
    textDiv.appendChild(btn2)
    textDiv.appendChild(btn3)

}

//질문에 대한 답변을 해달라고 요청하는 선택지
function youShouldQnASLT(textDiv){
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    btn1.classList.add(GPTOPTIONBTN, "QnAOK")
    btn2.classList.add(GPTOPTIONBTN, "RESETSELECT")
    btn1.innerText = "네"
    btn2.innerText = "처음으로"
    textDiv.innerText = "반려동물의 상태를 알아보기 위해 \n 질문에 대한 답변을 해주세요!"
    
    textDiv.appendChild(hrLine)
    
    emphasizeKeywords(textDiv)

    textDiv.appendChild(btn1)
    textDiv.appendChild(btn2)

    displayContainerScrollTop()
}



//이미지 진단 모드로 질병을 분석할까요?
function imageDiagnoseSLT(textDiv){
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    btn1.classList.add(GPTOPTIONBTN, "cameraReadyOn")
    btn2.classList.add(GPTOPTIONBTN, "RESETSELECT")
    btn1.innerText = "이미지 진단 모드 사용"
    btn2.innerText = "처음으로"
    textDiv.innerText = "이미지 진단 모드로 질병을 분석할까요?"
    
    textDiv.appendChild(hrLine)

    emphasizeKeywords(textDiv)

    textDiv.appendChild(btn1)
    textDiv.appendChild(btn2)

    displayContainerScrollTop()
}

//사진을 촬영하시겠습니까?
function takePictureSLT(textDiv){
    const btn1 = document.createElement("button");
    btn1.classList.add(GPTOPTIONBTN, "cameraOn")
    btn1.innerText = "사진 촬영하러 가기"
    textDiv.innerText = "진단을 위해 사진을 촬영하시겠습니까?"
    
    textDiv.appendChild(hrLine)
    
    emphasizeKeywords(textDiv)

    textDiv.appendChild(btn1)
    
    displayContainerScrollTop()
}

//아이의 진단이 끝났다
function petDiagnoseCompleteSLT(textDiv){
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    btn1.classList.add(GPTOPTIONBTN, "moreQuestion")
    btn2.classList.add(GPTOPTIONBTN, "RESETSELECT")
    btn1.innerText = "추가 질문하기"
    btn2.innerText = "처음으로"
    textDiv.innerText = "아이의 진단이 끝났습니다!\n추가 질문을 원하시면 선택해주세요."
    
    textDiv.appendChild(hrLine)

    emphasizeKeywords(textDiv)

    textDiv.appendChild(btn1)
    textDiv.appendChild(btn2)

    displayContainerScrollTop()
}

//추가 질문 있으심까
function moreQuestionSLT(textDiv){
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    btn1.classList.add(GPTOPTIONBTN, "expertFeedbackRequest")
    btn2.classList.add(GPTOPTIONBTN, "similarCases")
    btn3.classList.add(GPTOPTIONBTN, "recommendHospital")
    btn1.innerText = "전문가 상담 요청"
    btn2.innerText = "유사 사례"
    btn3.innerText = "병원 추천"
    textDiv.innerText = "어떤 것이 궁금하시나요?\n이 외의 질문은 채팅에 남겨주세요."

    textDiv.appendChild(hrLine)
    
    emphasizeKeywords(textDiv)

    textDiv.appendChild(btn1)
    textDiv.appendChild(btn2)
    textDiv.appendChild(btn3)

    displayContainerScrollTop()
}

/** 파라미터 안에 원하는 함수 넣으면 모드 선택해주는 콜백함수,
 * chatModeChoose, youShouldQnA, imageDiagnoseSLT, takePictureSLT, petDiagnoseCompleteSLT, moreQuestionSLT
 */
function addGPTOptions(selectFncs){
    const boxDiv = document.createElement("div");
    const textDiv = document.createElement("div");


    if (selectFncs == imageDiagnoseSLT){
        addGPTChattingBubble("이미지 진단 모드에서 사진을 촬영하거나\n 업로드하면 제가 의심되는 질병을 분석해드릴게요.")
    }
    boxDiv.classList.add(GPTCHATBOX)
    textDiv.classList.add(GPTCHATTEXT)

    displayContainer.appendChild(boxDiv)

    gptHeadChecker(boxDiv);

    boxDiv.appendChild(textDiv)
    selectFncs(textDiv)

    recentSpeaker = "gpt";

}

//user말풍선 안에 사진넣기
function addUserImageBubble(src){
    const boxDiv = document.createElement("div");
    const img = document.createElement("img");

    boxDiv.classList.add(USERCHATBOX)
    img.src = src;
    img.classList.add(USERCHATTEXT)
    img.style.padding = "0px";
    displayContainer.appendChild(boxDiv)

    boxDiv.appendChild(img)

    recentSpeaker = "user";

    displayContainerScrollTop()
}


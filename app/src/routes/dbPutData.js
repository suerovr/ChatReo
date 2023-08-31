// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { ScanCommand } = require("@aws-sdk/client-dynamodb");


const dynamoDBClient = new DynamoDBClient({
  region: "ap-northeast-2" // 지역을 설정해 주세요
});
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);

const view = {
    testview: (req, res)=> {
        res.render("test/test");
    },
}

async function putUserToDynamoDB(email, 과거병력 = "N/A", 생년월일 = "N/A", 성별 = "N/A", 의심질환 = "N/A", 이상 = "N/A", 종 = "N/A", 품종 = "N/A", ChatRoomID = "N/A", gpt솔루션 = "N/A") {
  const params = {
    TableName: "ChatReo_User",
    Item: {
      email: email,
      pastMedicalHistory: 과거병력,
      dateOfBirth: 생년월일,
      gender: 성별,
      suspectedDisease: 의심질환,
      abnormalities: 이상,
      species: 종,
      breed: 품종,
      ChatRoomID: ChatRoomID,
      gptSolution: gpt솔루션
    }
  };
  try {
    const response = await ddbDocClient.send(new PutCommand(params));
    console.log("User data inserted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error inserting user data:", error);
    throw error;
  }
}

//채팅불러오는 함수
async function getChatsFromDynamoDB(chatRoomID) {
    const params = {
        TableName: "ChatReo_Chat",
        KeyConditionExpression: "ChatRoomID = :roomId",
        ExpressionAttributeValues: {
            ":roomId": chatRoomID
        }
    };

    try {
        const response = await ddbDocClient.send(new QueryCommand(params));
        return response.Items.map(item => {
            return {
                ChatRoomID: item.ChatRoomID,
                TimeStamp: item.TimeStamp,
                email: item.email,
                bubbleForm: item.bubbleForm,
                value: item.value,
                diagnose: item.diagnose,
                question: item.question
            };
        });
    } catch (error) {
        console.error("Error fetching chat data:", error);
        throw error;
    }
}

// 낱개로가져오는 함수
// email과 ChatRoomID에 따른 '과거병력' 데이터를 가져오는 함수
async function getUserDataFromDynamoDB(email, ChatRoomID, attributeName) {
    const params = {
        TableName: "ChatReo_User",
        Key: {
            email: { S: email },
            ChatRoomID: { S: ChatRoomID }
        },
        ProjectionExpression: "#attrName",
        ExpressionAttributeNames: {
            "#attrName": attributeName
        }
    };

    try {
        const response = await ddbDocClient.send(new GetItemCommand(params));
        return response.Item ? response.Item[attributeName]["S"] : null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

//이멜로만 가져오기 채팅팅
async function getChatsByEmail(email) {
    const params = {
        TableName: 'ChatReo_Chat',
        FilterExpression: '#email = :emailVal',
        ExpressionAttributeNames: {
            '#email': 'email'
        },
        ExpressionAttributeValues: {
            ':emailVal': { S: email }
        }
    };

    const command = new ScanCommand(params);

    try {
        const { Items } = await ddbDocClient.send(command);
        return Items.map(item => {
            return {
                ChatRoomID: item.ChatRoomID ? item.ChatRoomID.S : null,
                TimeStamp: item.TimeStamp ? item.TimeStamp.S : null,
                email: item.email ? item.email.S : null,
                bubbleForm: item.bubbleForm ? item.bubbleForm.S : null,
                value: item.value ? item.value.S : null,
                diagnose: item.diagnose ? item.diagnose.S : null,
                question: item.question ? item.question.S : null
            };
        });
    } catch (error) {
        console.error('Error fetching chat data:', error);
        throw error;
    }
}

const translateToKorean = (attributeName) => {
    const translations = {
        "pastMedicalHistory": "과거병력",
        "dateOfBirth": "생년월일",
        "gender": "성별",
        "suspectedDisease": "의심질환",
        "abnormalities": "이상질환",
        "species": "종류",
        "breed": "품종",
        "gptSolution": "gpt솔루션"
    };
    
    return translations[attributeName] || attributeName;
};

async function getUserDiagnoseDataByEmail(email) {
    const attributeNames = [
        "breed", "species", "gender", "dateOfBirth",
        "pastMedicalHistory", "abnormalities", "suspectedDisease", "gptSolution"
    ];

    const params = {
        TableName: "ChatReo_User",
        KeyConditionExpression: "#email = :emailValue",
        ProjectionExpression: attributeNames.join(', '),
        ExpressionAttributeNames: {
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":emailValue": email
        }
    };

    try {
        const response = await ddbDocClient.send(new QueryCommand(params));
        if (response.Items && response.Items.length > 0) {
            const resultArray = [];
            for (const item of response.Items) {
                const result = {};
                for (const attr of attributeNames) {
                    const koreanKey = translateToKorean(attr);  // 이 함수의 정의가 필요합니다.
                    result[koreanKey] = item[attr] ? item[attr] : null;
                }
                resultArray.push(result);
            }
            return resultArray;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}


const MAX_RETRIES = 5; // 최대 재시도 횟수

async function deleteAllItems() {
    const params = {
        TableName: "ChatReo_Chat"
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        console.log("Items from Scan:", data.Items);

        for (const item of data.Items) {
            if (item.ChatRoomID && item.TimeStamp) {
                const chatRoomID = item.ChatRoomID.S;
                const timeStamp = item.TimeStamp.S;

                const deleteParams = {
                    TableName: "ChatReo_Chat",
                    Key: {
                        "ChatRoomID": chatRoomID,
                        "TimeStamp": timeStamp
                    }
                };

                let retryCount = 0;
                let success = false;

                while (!success && retryCount < MAX_RETRIES) {
                  try {
                    await ddbDocClient.send(new DeleteCommand(deleteParams));
                    success = true; // 성공하면 루프 종료
                  } catch (err) {
                    if (err.name === 'ProvisionedThroughputExceededException') {
                      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 100));
                      retryCount++;
                    } else {
                      console.error("Error deleting items:", err);
                      break;
                    }
                  }
                }

            } else {
            }
        }
    } catch (err) {
        console.error("Error deleting items:", err);
    }
}


// process
const process = {
    PutChatUserInfo: async (req, res) => {
    const { chatRoomID, timeStamp, email, bubbleForm, value, diagnose, question } = req.body;
    console.log(req.body);

    const params = {
        TableName: "ChatReo_Chat",
        Item: {
            ChatRoomID: chatRoomID || "N/A",
            TimeStamp: timeStamp || new Date().toISOString(),
            email: email || "N/A",
            bubbleForm: bubbleForm || "N/A",
            value: value || "N/A",
            diagnose: diagnose || "N/A",
            question: question || "N/A",
        }
    };

    try {
        const response = await ddbDocClient.send(new PutCommand(params));
        console.log("Data inserted successfully:", response);
        res.status(200).json({ message: 'Data inserted successfully' });  // 변경된 부분
    } 
    catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: 'Server Error' });  // 변경된 부분
        }
    },
    
    PutChatUser: async (req, res) => {
    const { email, 과거병력, 생년월일, 성별, 의심질환, 이상, 종, 품종, ChatRoomID, gpt솔루션 } = req.body;
        try {
        const response = await putUserToDynamoDB(email, 과거병력, 생년월일, 성별, 의심질환, 이상, 종, 품종, ChatRoomID, gpt솔루션);
        res.status(200).json({ message: 'User data inserted successfully', response });
        } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error });
        }
    },
    
    ImportChat: async (req, res) => {
    const { chatRoomID, email } = req.params;
  
    try {
    const chats = await getChatsFromDynamoDB(chatRoomID, email);
    res.status(200).json({ chats });
    } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error });
    }
},


    ImportUserData: async (req, res) => {
    const { email, ChatRoomID, attributeName } = req.query;
    try {
        const result = await getUserDataFromDynamoDB(email, ChatRoomID, attributeName);
        if (result) {
            res.status(200).json({ data: result });
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
},
    
    ImportChatbyEmail: async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).send('Email parameter is required.');
    }

    try {
        const chats = await getChatsByEmail(email);
        res.status(200).json(chats);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
},
    Delete: async (req, res) => {
    try {
        await deleteAllItems();
        res.status(200).send('Successfully deleted all items.');
    } catch (err) {
        res.status(500).send('Error deleting items: ' + err.toString());
    }
},
    GetDiagnoseData: async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    try {
        const data = await getUserDiagnoseDataByEmail(email);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('No data found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
    }
};


module.exports = {
    view,
    process
};
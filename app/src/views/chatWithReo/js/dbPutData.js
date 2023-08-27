console.log("가가가가d가")

const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "ap-northeast-2" });
const ddbDocClient = DynamoDBDocumentClient.from(client);


//채팅정보 ChatReo_Chat에 넣는 함수
async function putChatToDynamoDB(chatRoomID, timeStamp, email, bubbleForm, value) {
    const params = {
        TableName: "ChatReo_Chat",
        Item: {
            ChatRoomID: chatRoomID || "N/A",
            TimeStamp: timeStamp || new Date().toISOString(),
            email: email || "N/A",
            bubbleForm: bubbleForm || "N/A",
            value: value || "N/A"
        }
    };
    
    try {
        const response = await ddbDocClient.send(new PutCommand(params));
        console.log("Data inserted successfully:", response);
        return response;
    } catch (error) {
        console.error("Error inserting data:", error);
        throw error;
    }
}


//신상정보 ChatREo_Userdb에 넣는 함수
async function putUserToDynamoDB(
    email, 
    과거병력 = "N/A",
    생년월일 = "N/A",
    성별 = "N/A",
    의심질환 = "N/A",
    이상 = "N/A",
    종 = "N/A",
    품종 = "N/A",
    chat_id = "N/A",
    gpt솔루션 = "N/A"
) {
    const params = {
        TableName: "ChatReo_User",
        Item: {
            email: email,
            과거병력: 과거병력,
            생년월일: 생년월일,
            성별: 성별, 
            의심질환: 의심질환,
            이상: 이상,
            종: 종,
            품종: 품종,
            chat_id: chat_id,
            gpt솔루션: gpt솔루션
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
        return response.Items;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

module.exports = {
    putChatToDynamoDB,
    getChatsFromDynamoDB
};

console.log("가가가가가")
// 필요한 모듈 불러오기
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "ap-northeast-2" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

async function getUserDataFromDynamoDB(email,ChatRoomID, attributeName) {
    const params = {
        TableName: "ChatReo_User",
        Key: {
            email: { S: email } ,
            ChatRoomID: { S: ChatRoomID }// DynamoDB의 String 데이터 유형을 명시
        },
        ProjectionExpression: "#attrName",
        ExpressionAttributeNames: {
            "#attrName": attributeName
        }
    };

    try {
        const response = await ddbDocClient.send(new GetItemCommand(params));
        return response.Item ? response.Item[attributeName]["S"] : null;  // DynamoDB의 String 데이터 유형에서 값을 추출
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

// 사용 예시:
// 특정 email 주소의 '과거병력' 데이터를 가져오기
(async () => {
    try {
        const userData = await getUserDataFromDynamoDB("example@example.com","chat1234", '성별');
        console.log(userData);
    } catch (error) {
        console.error("Error:", error);
    }
})();
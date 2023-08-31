const { DynamoDBClient, DeleteCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const express = require('express');
const router = express.Router();
let globalEmail = "";
// 사용자로부터 이메일 및 이름을 받는 라우터

const dynamoDBClient = new DynamoDBClient({
  region: "ap-northeast-2" // 지역을 설정해 주세요
});

const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);
const MAX_RETRIES = 5;


const view = {
    login: (req, res)=> {
        res.render("login/login");
    },
}

const Process = {
    PutUserInfo: async (req, res) => {
        // 전역변수에 email 값을 저장합니다.
        globalEmail = req.body.email;
        console.log(`Email value set to global variable: ${globalEmail}`);
         try {
    await deleteAllItems();
    console.log("Successfully deleted all items.");
  } catch (err) {
    console.log("Error occurred while deleting items:", err);
  }

        res.redirect('/home');
    }
};


//모듈 내보내기
module.exports = {
    view,
    Process,
    globalEmail
};

const deleteAllItems = async () => {
  const params = {
    TableName: "ChatReo_Chat"
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    for (const item of data.Items) {
      const deleteParams = {
        TableName: "ChatReo_Chat",
        Key: {
          "ChatRoomID": item.ChatRoomID,
          "TimeStamp": item.TimeStamp
        }
      };

      let retryCount = 0;
      let success = false;

      while (!success && retryCount < MAX_RETRIES) {
        try {
          await ddbDocClient.send(new DeleteCommand(deleteParams));
          success = true;
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
    }
  } catch (err) {
    console.error("Error deleting items:", err);
  }
};
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");

const dynamoDBClient = new DynamoDBClient({
  region: "ap-northeast-2" // 지역을 설정해 주세요
});
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);


const process = {
    PutChatUserInfo: async (req, res) => {
    const { chatRoomID, email } = req.body; // 클라이언트로부터 받은 chatRoomID

    try {
        const chats = await getChatsFromDynamoDB(chatRoomID, email); // 이전에 정의한 함수를 호출
        res.status(200).json(chats); // 클라이언트에게 데이터를 JSON 형태로 반환
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
    }
};

module.exports = {
    view,
    process
};

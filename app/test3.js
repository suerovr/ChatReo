const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const multer = require('multer');
const multerS3 = require('multer-s3');
const axios = require('axios');

const app = express();
const port = 8080;

const s3Client = new S3Client({ region: 'ap-northeast-2' });
const dynamoDBClient = new DynamoDBClient({ region: 'ap-northeast-2' });
const path = require('path');

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'chat-reo-image',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "_" + file.originalname)
        }
    })
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));  // __dirname은 현재 디렉토리를 가리킵니다.
});

app.post('/upload', upload.single('image'), async (req, res) => {
    const email = req.body.email;
    const imageUrl = req.file.location;

app.post('/upload', upload.single('image'), async (req, res) => {
    const email = req.body.email;
    const imageUrl = req.file.location;
    const filename = req.file.originalname;

    const imageID = generateUniqueID();

    const params = {
        TableName: "ChatReo_Image",
        Item: {
            ImageID: { S: imageID },
            UploadTimestamp: { N: Date.now().toString() },
            S3URL: { S: imageUrl },
            Filename: { S: filename },
            Email: { S: email }
        }
    };
    
    function generateUniqueID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

    try {
        const response = await dynamoDBClient.send(new PutItemCommand(params));
        res.send({ message: "Upload successful!", data: response });
    } catch (error) {
        res.status(500).send(error);
    }
});


    try {
        const response = await dynamoDBClient.send(new PutItemCommand(params));
        res.send({ message: "Upload successful!", data: response });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use(express.static(__dirname));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

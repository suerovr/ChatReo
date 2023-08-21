const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient({ region: 'ap-northeast-2' });

async function addItem(email, name) {
    const params = {
        TableName: 'ChatReo_User',
        Item: marshall({
            email: email,
            'db-Name': name
        }, { removeUndefinedValues: true })
    };

    try {
        await client.send(new PutItemCommand(params));
        console.log('아이템이 성공적으로 추가되었습니다.');
    } catch (error) {
        console.error('아이템 추가 중 오류 발생:', error);
        throw error;
    }
}

module.exports = {
    addItem: addItem
};

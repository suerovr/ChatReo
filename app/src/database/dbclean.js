const { DynamoDBClient, ScanCommand, BatchWriteItemCommand } = require("@aws-sdk/client-dynamodb");

const REGION = "ap-northeast-2"; // 서울
const ddbClient = new DynamoDBClient({ region: REGION });

async function deleteAllItemsFromTable(tableName) {
    let lastEvaluatedKey;

    do {
        const scanResponse = await ddbClient.send(new ScanCommand({
            TableName: tableName,
            ProjectionExpression: "email",  // 파티션 키
            ExclusiveStartKey: lastEvaluatedKey
        }));

        if (scanResponse.Items && scanResponse.Items.length > 0) {
            const deleteRequests = scanResponse.Items.map(item => ({
                DeleteRequest: {
                    Key: item
                }
            }));

            await ddbClient.send(new BatchWriteItemCommand({
                RequestItems: {
                    [tableName]: deleteRequests
                }
            }));
        }

        lastEvaluatedKey = scanResponse.LastEvaluatedKey;

    } while (lastEvaluatedKey);

    console.log(`All items from ${tableName} have been deleted.`);
}

deleteAllItemsFromTable("ChatReo_User");  // ChatReo_User 테이블의 모든 항목을 삭제합니다.
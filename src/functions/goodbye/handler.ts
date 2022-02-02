import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";


var params = {
  TableName: 'testTable',
  Key: {
    ID: {
      N: '1'
    }
  },
};


//AWS.config.update({ region: 'us-east-1' });

const goodbye = async (event) => {
  var name = "Default";
  var error = "null";
  var test;

  var desc = "this";

  desc = "that";
  const client = new DynamoDBClient({ region: "us-east-1" });
  const resp = await client.send(new GetItemCommand(params));
  console.log(resp);
  console.log(1);
  // try {
  //   const results = await client.listTables({});
  //   resp = results.TableNames.join("\n");
  //   console.log(results.TableNames.join("\n"));
  //   console.log(10);
  // } catch (err) {
  //   error = err;
  //   console.error(err);
  //   console.log(err);
  //   console.log(20);
  // }
  console.log(2);

  // client.(params, function (err, data) {
  //   test = err + data;
  //   if (err) {
  //     console.log(err);
  //     error = err;
  //   } else {
  //     console.log(data);
  //     name = data.Item['name'];
  //     resp = data;
  //   }
  // });
  console.log(resp.Item);
  console.log(resp.Item.ID.N);
  console.log("Goodbye sent")
  return formatJSONResponse({
    message: `Goodbye Lach! ${resp.Item}`,
    desc,
    params,
    resp,
    error,
    test,
    event
  });
}

export const main = middyfy(goodbye);

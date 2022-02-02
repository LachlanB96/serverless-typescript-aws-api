import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(event.body.age);
  if (event.body.age != null) {
    return formatJSONResponse({
      message: `Hellooo ${event.body.name}! You are ${event.body.age} old!?`,
      event,
    });
  }
  return formatJSONResponse({
    message: `Hello ${event.body.name}!`,
    event,
  });
}

export const main = middyfy(hello);

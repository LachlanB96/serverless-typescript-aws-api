import type { AWS } from '@serverless/typescript';

import hello from 'src/functions/hello';
import goodbye from 'src/functions/goodbye';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      //DYNAMODB_TABLE: 'testTable2',
    },
    // iamRoleStatements: [{
    //   Effect: 'Allow',
    //   Action: [
    //     "dynamodb:Query",
    //     "dynamodb:Scan",
    //     "dynamodb:GetItem",
    //     "dynamodb:PutItem",
    //     "dynamodb:UpdateItem",
    //     "dynamodb:DeleteItem",
    //     "dynamodb:ListTables"
    //   ],
    //   Resource: 'arn:aws:dynamodb:*:*:table/*'
    // }]
  },
  functions: { hello, goodbye },
  package: { individually: true },
  custom: {
    tableName: 'testTable',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      MyDynamoTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.tableName}',
          AttributeDefinitions: [{
            AttributeName: 'ID',
            AttributeType: 'N'
          }],
          KeySchema: [{
            AttributeName: 'ID',
            KeyType: 'HASH'
          }],
          BillingMode: 'PAY_PER_REQUEST'
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;

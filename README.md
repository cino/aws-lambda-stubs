# AWS Lambda Stubs

> [!NOTE]
>  ⚠️  This is still a work in progress. Using it is at your own risk, anything can still change in implementation.

Gone are the days you need to write stubs to unit test your AWS Lambda functions locally. This repository provides simple stubs for AWS Lambda services, allowing you to focus on writing and testing your Lambda functions without the overhead of continuously writing the same boilerplate stubs.

This is highly inspired by [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) that already provides the type definitions for AWS Lambda events and context.

## Installation

You can install the package via npm:

```bash
npm install --save-dev aws-lambda-stubs
```

## Usage

Here's a simple example of how to use the stubs in your unit tests, given that `handler` is a Lambda function you want to test:

```typescript
import { SQSEventStub, SQSRecordStub } from "aws-lambda-stubs";
import { describe, expect, it } from "vitest";
import { handler } from "../src/sqs";

describe("sqs handler", () => {
  it("should log the received event", async () => {
    const mockEvent = SQSEventStub([SQSRecordStub({ key: "value" })]);

    expect(handler(mockEvent)).toEqual({});
  });
});
```

The content of mockEvent will be:

```json
{
  "Records": [
    {
      "messageId": "1",
      "receiptHandle": "MessageReceiptHandle",
      "body": "{\"key\":\"value\"}",
      "attributes": {
        "ApproximateReceiveCount": "1",
        "SentTimestamp": "1523232000000",
        "SenderId": "123456789012",
        "ApproximateFirstReceiveTimestamp": "1523232000001"
      },
      "messageAttributes": {},
      "md5OfBody": "a7353f7cddce808de0032747a0b7be50",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:012345678901:queue-name",
      "awsRegion": "us-east-1"
    }
  ]
}
```

As you can see, the stub provides a valid SQS event object that can be used to test your Lambda function locally. Saving you the trouble of having to create these objects manually.


Using the stubs will provide you valid AWS Lambda event objects, that are type-safe and in-sync with the actual AWS Lambda event definitions and typescript types from [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda).

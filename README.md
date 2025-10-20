# AWS Lambda Stubs

> ⚠️  This is still a work in progress. Using it is at your own risk, anything can still change in implementation.

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
import { sqsEventStub, sqsRecordStub } from "aws-lambda-stubs/src/index.ts";
import { describe, expect, it } from "vitest";
import { handler } from "../src/sqs";

describe("sqs handler", () => {
	it("should log the received event", async () => {
		const mockEvent = sqsEventStub([sqsRecordStub({ key: "value" })]);

		expect(handler(mockEvent)).toEqual({});
	});
});
```

Using the stubs will provide you valid AWS Lambda event objects, that are type-safe and in-sync with the actual AWS Lambda event definitions and typescript types from [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda).

# SimpleQueueServiceHandler #

This PHP trait provides functionality for polling AWS SQS (Simple Queue Service) to retrieve transcripts based on a target ID. It implements a retry mechanism with configurable attempts and delays to ensure reliable message retrieval from the queue.

**Type:** PHP Trait

## Purpose ##

Polls AWS SQS for transcripts matching a given ID. Retries up to 15 times with 5s delay.

## Methods ##

### `createSqsClient(): SqsClient` ###

Builds AWS SQS client from config.

- `aws.region`
- `aws.key`
- `aws.secret`

### `fetchTranscriptFromSqs(string $targetId): string` ###

Polls SQS queue up to **15 attempts** (5s sleep between) for message matching `$targetId`. Returns `transcription` string on match, or `'No transcription found!'`.

## How It Works ##

1. **SQS Client Creation**: The `createSqsClient()` method initializes an AWS SQS client using configuration values for region and credentials.

2. **Message Polling**: The `fetchTranscriptFromSqs()` method implements a polling loop that attempts to receive messages from the configured SQS queue.

3. **Retry Logic**: If no messages are found, the method waits 5 seconds and retries up to 15 times before giving up.

4. **Message Processing**: When messages are received, the method iterates through them, decoding the JSON body and checking for a matching ID.

5. **Transcript Extraction**: If a message with the target ID is found and contains a transcription field, it returns the transcript content.

## Source ##

```php
<?php

use Aws\Sqs\SqsClient;

trait SimpleQueueServiceHandler
{
    protected function createSqsClient(): SqsClient
    {
        return new SqsClient([
            'version'     => 'latest',
            'region'      => config('app.aws.region'),
            'credentials' => [
                'key'    => config('app.aws.key'),
                'secret' => config('app.aws.secret'),
            ],
        ]);
    }

    private function fetchTranscriptFromSqs(string $targetId): string
    {
        $maxAttempts = 15;
        $attempt     = 0;
        $success     = false;
        $messages    = null;

        do {
            $sqsClient = $this->createSqsClient();

            $result = $sqsClient->receiveMessage([
                'QueueUrl' => config('app.aws.sqs_queue_url'),
            ]);

            if (! empty($result['Messages'])) {
                $messages = $result['Messages'];
                $success  = true;
                break;
            }

            $attempt++;
            sleep(5);
        } while ($attempt < $maxAttempts);

        if (! $success) {
            return 'No transcription found!';
        }

        foreach ($messages as $message) {
            $messageBody = json_decode($message['Body'], true);

            if (isset($messageBody['id']) && $messageBody['id'] === $targetId) {
                $transcript = $messageBody['transcription'] ?? null;

                if ($transcript) {
                    return $transcript;
                }
            }
        }

        return 'No transcription found!';
    }
}
```

# Parsing Fireflies Interview Transcripts with AI (GPT-4) #

This guide demonstrates how to automatically parse and analyze interview transcripts from [Fireflies.ai](https://fireflies.ai) using their API, and extract key insights (like salary expectations) using OpenAI's GPT-4 API.

## 1. Set Up Fireflies API Access ##

```python
import requests

FIREFLIES_API_KEY = 'your_fireflies_api_key_here'
FIREFLIES_API_URL = 'https://api.fireflies.ai/graphql'

headers = {
    'Authorization': f'Bearer {FIREFLIES_API_KEY}',
    'Content-Type': 'application/json'
}
```

## 2. Fetch Transcript from Fireflies ##

```python
def get_transcript(meeting_id: str) -> str:
    query = """
    query($id: ID!) {
        transcript(id: $id) {
            text
        }
    }
    """
    variables = {'id': meeting_id}
    response = requests.post(
        FIREFLIES_API_URL,
        json={'query': query, 'variables': variables},
        headers=headers
    )
    response.raise_for_status()
    return response.json()['data']['transcript']['text']
```

```python
import openai

openai.api_key = 'your_openai_api_key_here'
```

## 3. Analyze Transcript through LLM ##

```python
def analyze_transcript(transcript: str) -> str:
    system_prompt = (
        "You are an AI assistant helping recruiters analyze interview transcripts. "
        "Extract key information such as salary expectations, job title discussed, availability, and qualifications. "
        "Be concise and structure the output as bullet points."
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",  # Use "gpt-4" for more accurate responses
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": transcript}
        ],
        temperature=0.1,
        max_tokens=1000
    )

    return response['choices'][0]['message']['content'].strip()
```

## 4. Run Everything ##

```python
if __name__ == "__main__":
    meeting_id = 'your_meeting_id_here'
    transcript = get_transcript(meeting_id)
    analysis = analyze_transcript(transcript)

    print("AI Interview Analysis:")
    print(analysis)
```

Ensure you have the necessary API Keys for Fireflies and OpenAI before running this script. Replace 'your_fireflies_api_key_here', 'your_openai_api_key_here', and 'your_meeting_id_here' with your actual API keys and meeting ID.

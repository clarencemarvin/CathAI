import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

def call_gemini_api(api_key, message):
    url = "https://developers.cathaypacific.com/hackathon-apigw/hackathon-middleware/v1/vertex-ai/google-gemini"
    
    headers = {
        "apiKey": api_key,
        "Content-Type": "application/json"
    }
    
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": message
                    }
                ]
            }
        ]
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an HTTPError if the status is 4xx, 5xx
        
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error calling Gemini API: {e}")
        return None

# Example usage
if __name__ == "__main__":
    api_key = os.getenv("API_KEY")
    print(api_key)
    message = "welcome to cathay hackathon!"
    
    response = call_gemini_api(api_key, message)
    
    if response:
        # Extract the response text
        try:
            model_response = response['candidates'][0]['content']['parts'][0]['text']
            print("Gemini's response:", model_response)
            
            # Print usage metadata
            print("\nUsage metadata:")
            print(f"Prompt tokens: {response['usageMetadata']['promptTokenCount']}")
            print(f"Response tokens: {response['usageMetadata']['candidatesTokenCount']}")
            print(f"Total tokens: {response['usageMetadata']['totalTokenCount']}")
            print(f"Model version: {response['modelVersion']}")
        except KeyError as e:
            print(f"Error parsing response: {e}")
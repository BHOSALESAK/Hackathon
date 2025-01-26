 # This example requires variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
language_key = 'Fi7JlAhX8BJh8hbtPsA8HDM24z3fc7YPVqldHU2MDoMiFHVuYEp8JQQJ99BAAC3pKaRXJ3w3AAAaACOGMdHS'
language_endpoint = 'https://ankita.cognitiveservices.azure.com/'

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

# Authenticate the client using your key and endpoint 
def authenticate_client():
    ta_credential = AzureKeyCredential(language_key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=ta_credential)
    return text_analytics_client

client = authenticate_client()

# Example method for detecting the language of text
def language_detection_example(client):
    try:
        documents = ["Ce document est rédigé en Français."]
        response = client.detect_language(documents = documents, country_hint = 'us')[0]
        print("Language: ", response.primary_language.name)

    except Exception as err:
        print("Encountered exception. {}".format(err))
language_detection_example(client)
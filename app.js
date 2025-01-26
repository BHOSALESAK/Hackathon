const endpoint = 'https://ankita.cognitiveservices.azure.com/language/:query-knowledgebases'; // Correct endpoint
const apiKey = 'Fi7JlAhX8BJh8hbtPsA8HDM24z3fc7YPVqldHU2MDoMiFHVuYEp8JQQJ99BAAC3pKaRXJ3w3AAAaACOGMdHS'; // Replace with your API Key
const apiVersion = '2021-10-01'; // Azure API version
const projectName = 'EduChatBot'; // Replace with your project name
const deploymentName = 'production'; // Replace with your deployment name

document.getElementById('sendBtn').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value.trim();
  const chatWindow = document.getElementById('chatWindow');

  if (userInput === '') {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.textContent = 'Please ask a question to continue.';
    chatWindow.appendChild(botMessage);
    return;
  }

  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.textContent = userInput;
  chatWindow.appendChild(userMessage);

  const botMessage = document.createElement('div');
  botMessage.className = 'message bot-message';
  botMessage.textContent = 'Thinking...';
  chatWindow.appendChild(botMessage);

  try {
    const response = await callAzureKnowledgeBase(userInput);
    botMessage.textContent = response;
  } catch (error) {
    botMessage.textContent = `Error: ${error.message}. Please check your connection or API configuration.`;
    console.error("API call error:", error);
  }

  document.getElementById('userInput').value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

async function callAzureKnowledgeBase(question) {
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': apiKey, // Ensure your API key is correct
  };

  const body = {
    top: 3,
    question: question,
    includeUnstructuredSources: true,
    confidenceScoreThreshold: 0.5,
  };

  try {
    const response = await fetch(
      `${endpoint}?projectName=${projectName}&api-version=${apiVersion}&deploymentName=${deploymentName}`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data); // Check the response in the console
    if (data.answers && data.answers.length > 0) {
      return data.answers[0].answer;
    } else {
      throw new Error('No answers found.');
    }
  } catch (error) {
    throw new Error(`API call failed: ${error.message}`);
  }
}

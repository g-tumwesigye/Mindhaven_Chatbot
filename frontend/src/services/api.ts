export interface ChatResponse {
  response: string;
}

export const sendMessageToAPI = async (question: string): Promise<string> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data.response || 'I apologize, but I received an unexpected response. Could you please try again?';
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return "I'm having trouble connecting to the server. Please make sure the FastAPI server is running on http://127.0.0.1:8000 and try again.";
    }
    
    return "I'm experiencing some technical difficulties right now. Please try again in a moment.";
  }
};
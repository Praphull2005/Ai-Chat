
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, MessageSender } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using mock service.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

let chat: Chat | null = null;

const createChatSession = () => {
  if (!ai) return;
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: [],
    config: {
        systemInstruction: 'You are a helpful AI assistant. Your responses should be informative and friendly.',
    }
  });
};

const convertToGeminiHistory = (messages: Message[]) => {
    return messages.map(msg => ({
        role: msg.sender === MessageSender.USER ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));
};


export const getStreamingChatResponse = async (
  messages: Message[], 
  onChunk: (chunk: string) => void
): Promise<void> => {
  if (!API_KEY || !ai) {
    // Mock response for development without API key
    const mockResponse = "This is a mock response to demonstrate the chat functionality. In a real application, this would be connected to an actual AI service. Let me break this down for you... lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const words = mockResponse.split(' ');
    for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        onChunk(words.slice(0, i + 1).join(' '));
    }
    return;
  }
  
  if (!chat) {
      createChatSession();
  }
  
  // The Gemini API currently doesn't support passing full history with each `sendMessageStream` call in the Chat object. 
  // We'll manage history on our side and send the latest message.
  const lastMessage = messages[messages.length - 1];

  if (chat) {
    chat.history = convertToGeminiHistory(messages.slice(0, -1));

    try {
        const result = await chat.sendMessageStream({ message: lastMessage.content });
        let fullText = '';
        for await (const chunk of result) {
            const chunkText = chunk.text;
            fullText += chunkText;
            onChunk(fullText);
        }
    } catch (error) {
        console.error("Error getting streaming response from Gemini:", error);
        onChunk("Sorry, I encountered an error. Please try again.");
    }
  }
};

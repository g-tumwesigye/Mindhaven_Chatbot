import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { sendMessageToAPI } from '../services/api';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const addMessage = useCallback((text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    return newMessage;
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    // Add user message immediately
    addMessage(text, 'user');
    
    // Set loading state
    setChatState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Send to API and get response
      const response = await sendMessageToAPI(text);
      
      // Add bot response
      addMessage(response, 'bot');
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage("I'm sorry, I'm having trouble processing your message right now. Please try again.", 'bot');
    } finally {
      // Clear loading state
      setChatState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [addMessage]);

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    error: chatState.error,
    sendMessage,
  };
};
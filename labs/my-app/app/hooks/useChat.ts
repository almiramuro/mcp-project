"use client";

import { useEffect, useState } from "react";
import { ChatMessage, getStorageService } from "@/app/services/storage";

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
}

export function useChat(chatId: string): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorageService();

  useEffect(() => {
    const loadConversation = async () => {
      try {
        setIsLoading(true);
        const loaded = await storage.getConversation(chatId);
        setMessages(loaded || []);
        setError(null);
      } catch (e) {
        console.error("Failed to load conversation:", e);
        setError("Failed to load chat");
      } finally {
        setIsLoading(false);
      }
    };

    loadConversation();
  }, [chatId]);

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;

    const message: ChatMessage = {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
      status: "sent",
    };

    try {
      setError(null);
      const updated = [...messages, message];
      setMessages(updated);
      await storage.saveMessage(chatId, message);
    } catch (e) {
      console.error("Failed to save message:", e);
      setMessages(messages); // Revert on error
      setError("Failed to save message");
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}

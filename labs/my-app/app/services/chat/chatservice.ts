import { ChatMessage, ConversationMetadata, getStorageService } from "@/app/services/storage";

export interface ChatService {
  createConversation(userId?: string): Promise<{ id: string }>;
  getConversation(chatId: string): Promise<ChatMessage[]>;
  sendUserMessage(chatId: string, content: string): Promise<ChatMessage>;
  sendAssistantMessage(chatId: string, content: string): Promise<ChatMessage>;
  getAllConversations(): Promise<ConversationMetadata[]>;
  updateConversationTitle(chatId: string, title: string): Promise<void>;
  deleteConversation(chatId: string): Promise<void>;
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function normalizeMessage(content: string): string {
  return content.trim();
}

async function saveMessage(chatId: string, message: ChatMessage): Promise<ChatMessage> {
  const storage = getStorageService();
  await storage.saveMessage(chatId, message);
  return message;
}

export const chatService: ChatService = {
  async createConversation(userId?: string) {
    const storage = getStorageService();
    return storage.createConversation(userId);
  },

  async getConversation(chatId: string) {
    const storage = getStorageService();
    const messages = await storage.getConversation(chatId);
    return messages ?? [];
  },

  async sendUserMessage(chatId: string, content: string) {
    const normalized = normalizeMessage(content);
    if (!normalized) {
      throw new Error("Cannot send empty user message");
    }

    const message: ChatMessage = {
      id: generateId(),
      role: "user",
      content: normalized,
      timestamp: Date.now(),
      status: "sent",
    };

    return saveMessage(chatId, message);
  },

  async sendAssistantMessage(chatId: string, content: string) {
    const normalized = normalizeMessage(content);
    if (!normalized) {
      throw new Error("Cannot send empty assistant message");
    }

    const message: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: normalized,
      timestamp: Date.now(),
      status: "sent",
    };

    return saveMessage(chatId, message);
  },

  async getAllConversations() {
    const storage = getStorageService();
    return storage.getAllConversations();
  },

  async updateConversationTitle(chatId: string, title: string) {
    const storage = getStorageService();
    return storage.updateConversationTitle(chatId, title);
  },

  async deleteConversation(chatId: string) {
    const storage = getStorageService();
    return storage.deleteConversation(chatId);
  },
};

export function getChatService(): ChatService {
  return chatService;
}

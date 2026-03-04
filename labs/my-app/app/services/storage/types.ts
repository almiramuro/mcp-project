export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  status?: "pending" | "sent";
  editedAt?: number;
}

export interface ConversationMetadata {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messageCount: number;
}

export interface StorageService {
  createConversation(userId?: string): Promise<{ id: string }>;
  saveMessage(chatId: string, message: ChatMessage): Promise<void>;
  getConversation(chatId: string): Promise<ChatMessage[] | null>;
  updateConversationTitle(chatId: string, title: string): Promise<void>;
  getAllConversations(): Promise<ConversationMetadata[]>;
  deleteConversation(chatId: string): Promise<void>;
}

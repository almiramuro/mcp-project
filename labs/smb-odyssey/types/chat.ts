export interface ChatItem {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  createdAt?: string
  conversationId?: string
}

export interface ChatConversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
  messages: ChatItem[]
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  description?: string;
  provider?: 'openai' | 'anthropic';
  model?: string;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  max_tokens?: number;
}

export interface SendMessagePayload {
  userMessage: string
  systemMessage?: string
  systemPromptId?: string
  conversationId?: string
}

export interface SendMessageParams {
  userMessage: string;
  systemMessage?: string;
  systemPromptId?: string;
  conversationId?: string;
  provider?: 'openai' | 'anthropic';
}

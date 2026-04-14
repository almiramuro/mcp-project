import { ChatItem, SendMessageParams } from '@/types/chat';
import { getPromptById } from '@/app/services/promptService';

export interface ChatService {
  sendMessage: (params: SendMessageParams) => Promise<ChatItem>;
  getMessages: (conversationId?: string) => Promise<ChatItem[]>;
  addSystemMessage: (conversationId: string, content: string) => Promise<ChatItem>;
  addUserMessage: (conversationId: string, content: string) => Promise<ChatItem>;
  addAssistantMessage: (conversationId: string, content: string) => Promise<ChatItem>;
}

type ProviderMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const DEFAULT_CONVERSATION_ID = 'default';
const conversations: Record<string, ChatItem[]> = {
  [DEFAULT_CONVERSATION_ID]: [],
};

function nowIso(): string {
  return new Date().toISOString();
}

function createMessage(role: ChatItem['role'], content: string, conversationId: string): ChatItem {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
    createdAt: nowIso(),
    conversationId,
  };
}

function ensureConversation(conversationId?: string): string {
  const id = conversationId ?? DEFAULT_CONVERSATION_ID;
  if (!conversations[id]) {
    conversations[id] = [];
  }
  return id;
}

function historyToProviderMessages(messages: ChatItem[]): ProviderMessage[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

async function resolveSystemMessage(systemMessage?: string, systemPromptId?: string): Promise<string | undefined> {
  const trimmedSystemMessage = systemMessage?.trim();
  if (trimmedSystemMessage) {
    return trimmedSystemMessage;
  }

  if (!systemPromptId) {
    return undefined;
  }

  const prompt = await getPromptById(systemPromptId);
  if (!prompt) {
    throw new Error(`Prompt template "${systemPromptId}" not found.`);
  }

  return prompt.content.trim();
}

async function callLlmProvider(
    messages: ProviderMessage[], 
    provider: 'openai' | 'anthropic'
): Promise<string> {
  if(provider === 'anthropic') {
    return callAnthropic(messages);
  } if(provider === 'openai') {
    return callOpenAI(messages);
  } else {
    throw new Error(`Unsupported LLM provider: ${provider}`);
  }
}

async function callOpenAI(messages: ProviderMessage[]): Promise<string> {
  // sends the assembled chat messages to the LLM provider
  const apiKey = process.env.OPENAI_API_KEY;
  console.log('apiKey: ', apiKey);
  const baseUrl = process.env.OPENAI_API_BASE_URL ?? 'https://api.openai.com/v1';
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for the LLM provider.');
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message || 'LLM provider request failed.');
  }

  return body.choices?.[0]?.message?.content?.trim() ?? '';
}

async function callAnthropic(messages: ProviderMessage[]): Promise<string> {
  // sends the assembled chat messages to the LLM provider
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const baseUrl = process.env.ANTHROPIC_API_BASE_URL ?? 'https://api.anthropic.com/v1';
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is required for the LLM provider.');
  }
  console.log('Anthropic Model used: ', process.env.ANTHROPIC_MODEL);
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6',
      messages,
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message || 'LLM provider request failed.');
  }

  return body.choices?.[0]?.message?.content?.trim() ?? '';
}

export const chatService: ChatService = {
  async sendMessage({ userMessage, systemMessage, systemPromptId, conversationId }) {
    // Main function to handle sending a user message and getting the assistant response

    const id = ensureConversation(conversationId);
    const normalizedUserMessage = userMessage?.trim();
    if (!normalizedUserMessage) {
      throw new Error('userMessage cannot be empty.');
    }

    await this.addUserMessage(id, normalizedUserMessage);
    const history = await this.getMessages(id);
    const resolvedSystemMessage = await resolveSystemMessage(systemMessage, systemPromptId);

    const providerMessages: ProviderMessage[] = [];
    if (resolvedSystemMessage) {
      providerMessages.push({ role: 'system', content: resolvedSystemMessage });
    } else {
      const persistedSystemMessages = history.filter((item) => item.role === 'system');
      providerMessages.push(...historyToProviderMessages(persistedSystemMessages));
    }

    providerMessages.push(
      ...history
        .filter((item) => item.role !== 'system')
        .map((item) => ({ role: item.role, content: item.content }))
    );

    const provider = process.env.LLM_PROVIDER === 'anthropic' ? 'anthropic' : 'openai';
    
    console.log('chosen provider in chatService: ', provider);

    const assistantContent = await callLlmProvider(providerMessages, provider);
    return this.addAssistantMessage(id, assistantContent);
  },

  async getMessages(conversationId) {
    const id = ensureConversation(conversationId);
    return [...conversations[id]];
  },

  async addSystemMessage(conversationId, content) {
    const id = ensureConversation(conversationId);
    const message = createMessage('system', content.trim(), id);
    conversations[id].push(message);
    return message;
  },

  async addUserMessage(conversationId, content) {
    const id = ensureConversation(conversationId);
    const message = createMessage('user', content.trim(), id);
    conversations[id].push(message);
    return message;
  },

  async addAssistantMessage(conversationId, content) {
    const id = ensureConversation(conversationId);
    const message = createMessage('assistant', content.trim(), id);
    conversations[id].push(message);
    return message;
  },
};
import { StorageService, ChatMessage, ConversationMetadata } from "./types";

const STORAGE_PREFIX = "mirabot_";
const CONVERSATIONS_INDEX_KEY = `${STORAGE_PREFIX}conversations`;

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function extractFirstMessagePreview(content: string, maxLength = 50): string {
  return content.substring(0, maxLength) + (content.length > maxLength ? "..." : "");
}

export const localStorageService: StorageService = {
  async createConversation(userId?: string): Promise<{ id: string }> {
    const id = generateId();
    const now = Date.now();

    const metadata: ConversationMetadata = {
      id,
      title: "New Chat",
      createdAt: now,
      updatedAt: now,
      messageCount: 0,
    };

    try {
      const conversations = this.getAllConversations();
      const currentList = await conversations;
      const updated = [...currentList, metadata];
      localStorage.setItem(
        CONVERSATIONS_INDEX_KEY,
        JSON.stringify(updated)
      );
    } catch (e) {
      console.error("Failed to create conversation:", e);
      localStorage.setItem(
        CONVERSATIONS_INDEX_KEY,
        JSON.stringify([metadata])
      );
    }

    // Initialize empty messages array for this conversation
    localStorage.setItem(`${STORAGE_PREFIX}chat_${id}`, JSON.stringify([]));

    return { id };
  },

  async saveMessage(chatId: string, message: ChatMessage): Promise<void> {
    const messages = await this.getConversation(chatId);
    const updated = messages ? [...messages, message] : [message];

    localStorage.setItem(
      `${STORAGE_PREFIX}chat_${chatId}`,
      JSON.stringify(updated)
    );

    // Update conversation metadata
    const conversations = await this.getAllConversations();
    const updated_conversations = conversations.map((conv) => {
      if (conv.id === chatId) {
        return {
          ...conv,
          messageCount: updated.length,
          updatedAt: Date.now(),
          // Auto-generate title from first user message
          title:
            conv.title === "New Chat"
              ? updated.find((m) => m.role === "user")
                ? extractFirstMessagePreview(
                  updated.find((m) => m.role === "user")!.content
                )
                : "New Chat"
              : conv.title,
        };
      }
      return conv;
    });

    localStorage.setItem(
      CONVERSATIONS_INDEX_KEY,
      JSON.stringify(updated_conversations)
    );
  },

  async getConversation(chatId: string): Promise<ChatMessage[] | null> {
    const data = localStorage.getItem(`${STORAGE_PREFIX}chat_${chatId}`);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse conversation:", e);
      return null;
    }
  },

  async updateConversationTitle(
    chatId: string,
    title: string
  ): Promise<void> {
    const conversations = await this.getAllConversations();
    const updated = conversations.map((conv) => {
      if (conv.id === chatId) {
        return { ...conv, title };
      }
      return conv;
    });

    localStorage.setItem(
      CONVERSATIONS_INDEX_KEY,
      JSON.stringify(updated)
    );
  },

  async getAllConversations(): Promise<ConversationMetadata[]> {
    const data = localStorage.getItem(CONVERSATIONS_INDEX_KEY);
    if (!data) return [];

    try {
      return JSON.parse(data).sort(
        (a: ConversationMetadata, b: ConversationMetadata) =>
          b.updatedAt - a.updatedAt
      );
    } catch (e) {
      console.error("Failed to parse conversations:", e);
      return [];
    }
  },

  async deleteConversation(chatId: string): Promise<void> {
    localStorage.removeItem(`${STORAGE_PREFIX}chat_${chatId}`);

    const conversations = await this.getAllConversations();
    const updated = conversations.filter((conv) => conv.id !== chatId);

    localStorage.setItem(
      CONVERSATIONS_INDEX_KEY,
      JSON.stringify(updated)
    );
  },
};

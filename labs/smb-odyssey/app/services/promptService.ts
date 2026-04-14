import { PromptTemplate } from '@/types/chat';

const promptTemplates: Record<string, PromptTemplate> = {
  default: {
    id: 'default',
    name: 'Default system prompt',
    content: 'You are a helpful assistant. Answer clearly and concisely.',
    description: 'Base instruction used when no prompt ID is provided.',
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    top_p: 0.95,
    top_k: 0,
    max_tokens: 512,
  },
};

function generatePromptId(): string {
  return `prompt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function getPromptById(promptId: string): Promise<PromptTemplate | undefined> {
  return promptTemplates[promptId];
}

export async function getAllPrompts(): Promise<PromptTemplate[]> {
  return Object.values(promptTemplates);
}

export async function createPrompt(data: Omit<PromptTemplate, 'id'>): Promise<PromptTemplate> {
  const id = generatePromptId();
  const prompt: PromptTemplate = {
    id,
    name: data.name,
    content: data.content,
    description: data.description,
    provider: data.provider,
    model: data.model,
    temperature: data.temperature,
    top_p: data.top_p,
    top_k: data.top_k,
    max_tokens: data.max_tokens,
  };

  promptTemplates[id] = prompt;
  return prompt;
}
export async function updatePrompt(
  promptId: string,
  data: Partial<Omit<PromptTemplate, 'id'>>
): Promise<PromptTemplate | undefined> {
  const prompt = promptTemplates[promptId];
  if (!prompt) {
    return undefined;
  }

  const updated = { ...prompt, ...data };
  promptTemplates[promptId] = updated;
  return updated;
}

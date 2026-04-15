import { chatService } from '@/app/services/chatService';

export async function POST(req: Request) {
  const { userMessage, systemMessage, systemPromptId, conversationId, action} = await req.json();

  if (!userMessage || typeof userMessage !== 'string') {
    return new Response(JSON.stringify({ error: 'userMessage is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (action === 'addUserMessage') {
      const id = await chatService.addUserMessage(conversationId ?? undefined, userMessage);
      const messages = await chatService.getMessages(conversationId);
      return new Response(JSON.stringify({ conversationId: id, messages }), { headers: { 'Content-Type': 'application/json' } });
    }

    const assistantMessage = await chatService.sendMessage({
      userMessage,
      systemMessage,
      systemPromptId,
      conversationId,
    });

    const messages = await chatService.getMessages(conversationId);
    return new Response(JSON.stringify({ assistantMessage, messages }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message || 'Request failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const conversationId = url.searchParams.get('conversationId') ?? undefined;
  const messages = await chatService.getMessages(conversationId);

  return new Response(JSON.stringify({ messages }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

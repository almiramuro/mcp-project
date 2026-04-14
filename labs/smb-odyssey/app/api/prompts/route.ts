import { createPrompt, getAllPrompts, updatePrompt } from '@/app/services/promptService';

export async function GET() {
  const prompts = await getAllPrompts();
  return new Response(JSON.stringify({ prompts }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  const { name, content, description } = await req.json();

  if (!name || typeof name !== 'string' || !content || typeof content !== 'string') {
    return new Response(JSON.stringify({ error: 'name and content are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const prompt = await createPrompt({
    name,
    content,
    description: typeof description === 'string' ? description : undefined,
  });

  return new Response(JSON.stringify(prompt), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PATCH(req: Request) {
  const { id, name, content, description } = await req.json();

  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const updatedPrompt = await updatePrompt(id, {
    name: typeof name === 'string' ? name : undefined,
    content: typeof content === 'string' ? content : undefined,
    description: typeof description === 'string' ? description : undefined,
  });

  if (!updatedPrompt) {
    return new Response(JSON.stringify({ error: `Prompt ${id} not found` }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(updatedPrompt), {
    headers: { 'Content-Type': 'application/json' },
  });
}

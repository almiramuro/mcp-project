import dotenv from 'dotenv';
import { chatService } from '../app/services/chatService';
import { getAllPrompts, getPromptById, createPrompt, updatePrompt } from '../app/services/promptService';

dotenv.config();

async function main() {

 console.log('cwd:', process.cwd());
//console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

  console.log('prompts', await getAllPrompts());

  const prompt = await getPromptById('default');
  console.log('default prompt', prompt);

  const response = await chatService.sendMessage({
    userMessage: 'Hello from test',
    systemPromptId: 'default',
    provider: 'anthropic',
  });

  console.log('assistant response', response);
  console.log('history', await chatService.getMessages());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
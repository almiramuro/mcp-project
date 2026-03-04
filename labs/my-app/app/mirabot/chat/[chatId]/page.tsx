"use client";

import { useChat } from "@/app/hooks/useChat";
import { useLocale } from "@/app/hooks/useLocale";
import { useState, use } from "react";

interface PageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default function ChatPage({ params }: PageProps) {
  const { chatId } = use(params);
  const { messages, isLoading, error, sendMessage } = useChat(chatId);
  const [input, setInput] = useState("");
  const locale = useLocale();

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-black text-white p-8 bg-stars h-full">
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-xl mb-4">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {isLoading ? (
          <div className="text-gray-400 text-center">{locale.chat.loading}</div>
        ) : messages.length === 0 ? (
          <div className="text-gray-400 text-center">
            {locale.chat.startConversation}
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl ${
                msg.role === "user"
                  ? "bg-blue-900 ml-auto max-w-xs"
                  : "bg-gray-800 mr-auto max-w-xs"
              }`}
            >
              <div className="text-xs text-gray-300 mb-1 opacity-75">
                {msg.role === "user" ? "You" : "Assistant"}
              </div>
              {msg.content}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl bg-gray-700 outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={locale.chat.placeholder}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-white text-black px-6 rounded-xl hover:bg-gray-200 disabled:opacity-50"
        >
          {locale.chat.send}
        </button>
      </div>
    </div>
  );
}

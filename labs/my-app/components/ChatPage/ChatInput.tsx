"use client";

import { useLocale } from "@/app/hooks/useLocale";
import { use, useState } from "react";
import { useChat } from "@/app/hooks/useChat";
import SendIcon from "@mui/icons-material/Send";

interface PageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export function ChatInput({ params }: PageProps) {
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
                <SendIcon />
            </button>
        </div>
  );
}

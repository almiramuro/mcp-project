"use client"

import styles from "@/app/(pages)/control-center/control-center.module.css"
import ChatConversation from "@/components/ControlCenter/ChatConversation";
import ChatInput from "@/components/ControlCenter/ChatInput";
import type { ChatItem } from "@/types/chat"
import { useState, useEffect } from "react";

export default function ChatWindow() {
    const [conversationId, setConversationId] = useState<string>("");
    const [messages, setMessages] = useState<ChatItem[]>([]);
    const currentMessages = conversationId ? messages.filter((msg) => msg.conversationId === conversationId) : [];

    const handleSend = async (userMessage: string) => {
        const id = conversationId ? conversationId : crypto.randomUUID();
        setConversationId(id);

        const userBubble: ChatItem = {
            id: crypto.randomUUID(),
            role: "user",
            content: userMessage,
            createdAt: new Date().toISOString(),
            conversationId: id,
        };

        setMessages((prev) => [...prev, userBubble]);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userMessage, conversationId: id }),
            });
            
            const data = await response.json();
            if (!response.ok) {
            throw new Error(data.error || "Send failed");
            }

            console.log("Received messages: ", data.messages);
            setMessages(data.messages ?? []);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className={`${styles["chat-window"]}`}>
            <div>
                <ChatConversation chatId={conversationId ?? ""} messages={currentMessages} />
            </div>
            <div>
                <ChatInput onSend={handleSend} />
            </div>
        </div>
    );
}
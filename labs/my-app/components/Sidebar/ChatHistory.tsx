"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HistoryItem } from "./HistoryItem";
import { ConversationMetadata, getStorageService } from "@/app/services/storage";
import { useLocale } from "@/app/hooks/useLocale";

export function ChatHistory() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [historyItems, setHistoryItems] = useState<ConversationMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const storage = getStorageService();
      const conversations = await storage.getAllConversations();
      setHistoryItems(conversations);
    } catch (e) {
      console.error("Failed to load chat history:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Load history when expanded
  useEffect(() => {
    if (isExpanded) {
      loadHistory();
    }
  }, [isExpanded]);

  // Reload history when pathname changes (new chat created)
  useEffect(() => {
    if (isExpanded && pathname.includes("/mirabot/chat/")) {
      loadHistory();
    }
  }, [pathname, isExpanded]);

  return (
    <div className="border-t border-gray-800 p-4 mt-auto">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded flex items-center justify-between transition-colors"
      >
        <span className="text-gray-300 font-semibold text-sm">{locale.sidebar.chatHistory}</span>
        <span
          className={`text-gray-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-1 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="text-gray-500 text-xs p-2">{locale.sidebar.loading}</div>
          ) : historyItems.length === 0 ? (
            <div className="text-gray-500 text-xs p-2">{locale.sidebar.noChats}</div>
          ) : (
            historyItems.map((item) => (
              <HistoryItem key={item.id} id={item.id} title={item.title} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

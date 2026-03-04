"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStorageService } from "@/app/services/storage";

export default function Chat() {
  const router = useRouter();

  useEffect(() => {
    const createNewChat = async () => {
      const storage = getStorageService();
      const { id } = await storage.createConversation();
      router.replace(`/mirabot/chat/${id}`);
    };

    createNewChat();
  }, [router]);

  return (
    <div className="flex flex-col bg-black text-white p-8 bg-stars h-full items-center justify-center">
      <div className="text-gray-400">Creating new chat...</div>
    </div>
  );
}

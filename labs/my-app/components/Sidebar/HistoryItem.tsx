"use client";

import { useRouter, usePathname } from "next/navigation";
import { getStorageService } from "@/app/services/storage";
import DeleteIcon from "@mui/icons-material/Delete";

interface HistoryItemProps {
  title: string;
  id?: string;
  onDelete?: () => void;
  fallbackPath?: string;
}

export function HistoryItem({ title, id, onDelete, fallbackPath = "/mirabot/chat" }: HistoryItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname.includes(`/mirabot/chat/${id}`);

  const goToChatId = () => {
    if (id) {
      router.push(`/mirabot/chat/${id}`);
    }
  };

  const deleteItem = async () => {
    if (!id) return;

    try {
      const storage = getStorageService();
      await storage.deleteConversation(id);

      if (pathname.includes(`/mirabot/chat/${id}`)) {
        try {
          router.replace(fallbackPath);
        } catch (routerError) {
          console.warn("Router replace failed, using window fallback:", routerError);
          window.location.href = fallbackPath;
        }
      }

      onDelete?.();
    } catch (error) {
      console.error("Failed to delete history item:", error);
    }
  };
  return (
    <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={goToChatId}
          className={`w-full text-left px-4 py-2 rounded text-sm truncate transition-colors ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
          }`}
        >
          {title}
        </button>

        <button
          onClick={deleteItem}
          className={`${
            isActive
              ? ""
              : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
          }`}>
            <DeleteIcon sx={{ fontSize: 18 }} className="text-gray-400 hover:text-gray-200" />
        </button>
    </div>
    
  );
}

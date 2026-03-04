"use client";

import { useRouter, usePathname } from "next/navigation";

interface HistoryItemProps {
  title: string;
  id?: string;
}

export function HistoryItem({ title, id }: HistoryItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname.includes(`/mirabot/chat/${id}`);

  const handleClick = () => {
    if (id) {
      router.push(`/mirabot/chat/${id}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-4 py-2 rounded text-sm truncate transition-colors ${
        isActive
          ? "bg-gray-700 text-white"
          : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
      }`}
    >
      {title}
    </button>
  );
}

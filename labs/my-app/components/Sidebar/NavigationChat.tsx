"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { NAVROUTES } from "@/app/constants/routes";
import { getStorageService } from "@/app/services/storage";
import { useLocale } from "@/app/hooks/useLocale";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';

export function NavigationChat() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const handleNewChat = () => {
    startTransition(async () => {
      try {
        const storage = getStorageService();
        const { id } = await storage.createConversation();
        router.push(`/mirabot/chat/${id}`);
      } catch (e) {
        console.error("Failed to create chat:", e);
      }
    });
  };

  const navItems = [
    { href: NAVROUTES.HOME, label: "Home", icon: "home" },
  ];

  const mapIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <HomeIcon sx={{ fontSize: 25 }} className="mr-2" />;
      case "create":
        return <CreateIcon sx={{ fontSize: 25 }} className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <nav className="space-y-2 p-4" style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded transition-colors ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {mapIcon(item.icon)}
            {item.label}
          </Link>
        );
      })}
      <button
        onClick={handleNewChat}
        disabled={isPending}
        className="block w-full text-left px-4 py-2 rounded transition-colors text-gray-300 hover:bg-gray-800 disabled:opacity-50"
      >
        {mapIcon("create")}
        {isPending ? locale.chat.creating : locale.chat.newChat}
      </button>
    </nav>
  );
}

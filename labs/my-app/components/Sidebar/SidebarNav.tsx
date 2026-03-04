"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVROUTES } from "@/app/constants/routes";

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { href: NAVROUTES.CHAT, label: "Chat" },
    { href: NAVROUTES.KNOWLEDGE_BASE, label: "Knowledge Base" },
    { href: NAVROUTES.MCP_TOOLS, label: "MCP Tools" },
  ];

  return (
    <nav className="space-y-2 p-4">
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
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

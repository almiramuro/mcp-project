"use client";

import { SidebarNav } from "@/components/Sidebar/SidebarNav";
import { ChatHistory } from "@/components/Sidebar/ChatHistory";
import { usePathname } from "next/dist/client/components/navigation";
import { NAVROUTES } from "@/app/constants/routes";
import { NavigationChat } from "@/components/Sidebar/NavigationChat";
import { NavigationTools } from "@/components/Sidebar/NavigationTools";
import { NavigationKB } from "@/components/Sidebar/NavigationKB";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const renderDynamicSidebarContent = () => {
    if (pathName.startsWith(NAVROUTES.CHAT)) {
      return <NavigationChat />;
    }
    else if (pathName.startsWith(NAVROUTES.KNOWLEDGE_BASE)) {
      return <NavigationKB />;
    }
    else if (pathName.startsWith(NAVROUTES.MCP_TOOLS)) {
      return <NavigationTools />;
    }
    return null;
  }

  return (
    <div className="flex h-screen">
      <aside className="hidden md:flex md:w-[18%] bg-gray-900 border-r border-gray-800 flex-col overflow-y-auto">
        {renderDynamicSidebarContent()}
        <SidebarNav />
        <ChatHistory />
      </aside>

      <main className="flex-1 overflow-auto md:w-[82%] w-full">
        {children}
      </main>
    </div>
  );
}

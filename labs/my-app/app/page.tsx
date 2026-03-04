"use client";

import { useRouter } from "next/navigation";
import { NAVROUTES } from "./constants/routes";

export default function Home() {

  const router = useRouter();
  return (
      <div className="flex flex-col items-center justify-center h-screen bg-stars gap-8">
        <div className="title">
          <h1
            className="text-9xl"
          >
            WELCOME
          </h1>
          <p className="text-8xl">
            THINKERS
          </p>
        </div>
        
        <div className="nav-buttons-horizontal">
          <button
            onClick={() => router.push(NAVROUTES.CHAT)}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Chat
          </button>
          <button
            onClick={() => router.push(NAVROUTES.KNOWLEDGE_BASE)}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Knowledge Base
          </button>
          <button
            onClick={() => router.push(NAVROUTES.MCP_TOOLS)}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Tools
          </button>
        </div>
        
      </div>
  );
}
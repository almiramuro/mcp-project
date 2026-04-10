"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { NAVROUTES } from "./constants/routes";

export default function Home() {
  
  const router = useRouter();
  return (
      <div className="flex flex-col items-center justify-center h-screen bg-stars gap-8">
        <div className="app-title">
          <h1
            className="text-9xl"
          >
            ODYSSEY
          </h1>
        </div>
        
        <div className="nav-buttons-horizontal">
          <button
            onClick={() => router.push(NAVROUTES.SETTINGS)}
            className="txt-button"
          >
            Log In
          </button>
          <button
            onClick={() => router.push(NAVROUTES.CHAT)}
            className="txt-button"
          >
            Sign Up
          </button>
        </div>
        
      </div>
  );
}

"use client";
import { usePathname } from "next/dist/client/components/navigation";
import { Silkscreen } from "next/font/google";

const silkScreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: "400",
});


export default function PagesLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className={` ${silkScreen.variable} flex h-screen`}>
            {/* <aside className="hidden md:flex md:w-[18%] bg-gray-900 border-r border-gray-800 flex-col overflow-y-auto">
                
            </aside> */}
            <div className="flex-1 overflow-auto md:w-[82%] w-full">
                {children}
            </div>
        </div>
    );
}

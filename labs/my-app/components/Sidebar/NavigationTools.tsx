"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVROUTES } from "@/app/constants/routes";
import HomeIcon from '@mui/icons-material/Home';

export function NavigationTools() {
  const pathname = usePathname();

  const navItems = [
    { href: NAVROUTES.HOME, label: "Home", icon: "home" },
  ];

  const mapIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <HomeIcon sx={{ fontSize: 25 }} className="mr-2" />;
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
    </nav>
  );
}
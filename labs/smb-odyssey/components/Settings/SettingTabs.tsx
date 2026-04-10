"use client"

import { useState } from "react";
import styles from "@/app/(pages)/settings/settings.module.css";

interface SettingTabButton {
  id: string;
  label: string;
  description?: string;
}

const tabButtons: SettingTabButton[] = [
  { id: "profile", label: "Business Profile", description: "View and update business profile" },
  { id: "account", label: "Account", description: "Update account settings and preferences" },
  { id: "connections", label: "Connections", description: "Manage app connections" },
  { id: "documentations", label: "Documentation", description: "Manage business documentations" },
];

export default function SettingTabs() {
  const [activeTab, setActiveTab] = useState<string>(tabButtons[0].id);

  return (
    <section className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm`}>
      <div className={`${styles["settings-tabs"]} grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
        {tabButtons.map((button) => {
          const isActive = button.id === activeTab;
          return (
            <button
              key={button.id}
              type="button"
              onClick={() => setActiveTab(button.id)}
              className={`${styles["setting-tab-button"]} ${isActive ? styles["active"] : ""}`}>
              <span className="block text-sm font-medium">{button.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

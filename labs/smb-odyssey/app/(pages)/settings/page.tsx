"use client"

import { useState } from "react";
import SettingsMain from "@/components/Settings/SettingsMain";
import styles from "@/app/(pages)/settings/settings.module.css"
import SettingsSidePanel from "@/components/Settings/SettingsSidePanel";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<string>("profile");  
  
  return (
    <div className="page-wrapper">
      <div className="page-title">
        <h1>Settings</h1>
      </div>
      <div className={`${styles["settings-container"]}`}>
        <div>
          <SettingsSidePanel activeTab={activeTab} onTabChange={setActiveTab}  />
        </div>
        <div>
          <SettingsMain activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

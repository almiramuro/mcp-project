import SettingsMain from "@/components/Settings/SettingsMain";
import styles from "@/app/(pages)/settings/settings.module.css"
import SettingsSidePanel from "@/components/Settings/SettingsSidePanel";

export default function Settings() {
  return (
    <div className="page-wrapper">
      <div className="page-title">
        <h1>Settings</h1>
      </div>
      <div className={`${styles["settings-container"]}`}>
        <div>
          <SettingsSidePanel />
        </div>
        <div>
          <SettingsMain />
        </div>
      </div>
    </div>
  );
}

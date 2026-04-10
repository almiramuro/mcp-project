import SettingTabs from "./SettingTabs";
import styles from "@/app/(pages)/settings/settings.module.css"

export default function SettingsSidePanel() {
    return (
        <div className={styles["side-panel"]}>
            <div className={styles["profile-picture"]}>
                image
            </div>
            <SettingTabs />
        </div>
    );
}
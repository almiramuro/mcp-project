import SettingTabs from "./SettingTabs";
import styles from "@/app/(pages)/settings/settings.module.css"

interface Props {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function SettingsSidePanel({ activeTab, onTabChange }: Props) {
    return (
        <div className={styles["side-panel"]}>
            <div className={styles["profile-picture"]}>
                image
            </div>
            <SettingTabs activeTab={activeTab} onTabChange={onTabChange} />
        </div>
    );
}
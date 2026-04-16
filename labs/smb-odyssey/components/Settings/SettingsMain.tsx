import styles from "@/app/(pages)/settings/settings.module.css"
import DocumentUpload from "./Documentation/DocumentUploads";

interface Props {
    activeTab: string;
}

export default function SettingsMain({activeTab}: Props) {
    let content

    switch(activeTab) {
        case "profile":
            // content = <ProfileSettings />;
            content = <div><h1>Business Profile</h1></div>
            break;
        case "account":
            // content = <AccountSettings />;
            content = <div><h1>Account Settings</h1></div>
            break;
        case "connections":
            // content = <ConnectionsSettings />;
            content = <div><h1>Connections</h1></div>
            break;
        case "documentations":
            content = <DocumentUpload businessId="default-business-id" onUploadSuccess={() => {}} />;
            //content = <div><h1>Documentation</h1></div>
            break;
        default:
            // content = <ProfileSettings />;
            content = <div><h1>Settings Panel</h1></div>
    }

    return (
        <section className={`${styles["settings-main"]}`}>
            {content}
        </section>
    );
}
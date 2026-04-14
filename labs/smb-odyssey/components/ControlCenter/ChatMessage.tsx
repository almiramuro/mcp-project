import styles from "@/app/(pages)/control-center/control-center.module.css"
import type { ChatItem } from "@/types/chat"

export default function ChatMessage({ message }: { message: ChatItem }) {
    return (
        <div className={styles["chat-message"]}>
            <div className={styles["avatar"]}>
                U
            </div>
            <div className={styles["chat-bubble"]}>
                {message.content}
            </div>
        </div>
    );
}   
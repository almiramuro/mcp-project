import styles from "@/app/(pages)/control-center/control-center.module.css"
import type { ChatItem } from "@/types/chat"
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }: { message: ChatItem }) {
    const roleClass = message.role == "user" ? "user" : "agent";
    return (
        <div className={`${styles["chat-message"]} ${styles[roleClass]}`}>
            <div className={styles["avatar"]}>
                {message.role === "user" ? "U" : "A"}
            </div>
            <div className={`${styles["chat-bubble"]} prose lg:prose-xl`}>
                <ReactMarkdown>
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}  
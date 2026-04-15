import styles from "@/app/(pages)/control-center/control-center.module.css"
import ChatMessage from "@/components/ControlCenter/ChatMessage";
import type { ChatItem } from "@/types/chat"

export function NewChatConversation() {
    return(
        <div className={styles["chat-conversation-new"]}>
            How you doin'?
        </div>
    )
}

export default function ChatConversation({chatId, messages}: {chatId: string, messages: ChatItem[]}) {
    if(!chatId) {
        return <NewChatConversation />
    }
    return (
        <div className={styles["conversation-box"]}>
            {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
        </div>
    );
}

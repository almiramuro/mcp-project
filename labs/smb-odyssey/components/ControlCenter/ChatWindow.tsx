import styles from "@/app/(pages)/control-center/control-center.module.css"
import ChatConversation from "@/components/ControlCenter/ChatConversation";
import ChatInput from "@/components/ControlCenter/ChatInput";
import type { ChatItem } from "@/types/chat"

export default function ChatWindow() {
    var mockMessages : ChatItem[] = [
        {
            id: "1",
            role: "user",
            content: "Hello, how are you?"
        }
    ]
    return (
        <div className={`${styles["chat-window"]}`}>
            <div>
                <ChatConversation chatId="" messages={mockMessages} />
            </div>
            <div>
                <ChatInput params={{chatId: ""}} />
            </div>
        </div>
    );
}
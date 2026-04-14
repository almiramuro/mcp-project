import styles from "@/app/(pages)/control-center/control-center.module.css"
import { useLocale } from "@/app/hooks/useLocale";
import { useState } from "react";

interface ChatInputProps {
    params: {
        chatId: string;
    }
}

export default function ChatInput({params} : ChatInputProps) {
    const [input, setInput] = useState("");
    const locale = useLocale();

    return (
        <div className={styles["chat-input-field"]}>
            <input
                value={input}
                placeholder={locale.chat.placeholder}
                onChange={(e) => setInput(e.target.value)}
                />
            <button
                className="txt-button"
            >
                {locale.chat.send}
            </button>
        </div>
    );
}
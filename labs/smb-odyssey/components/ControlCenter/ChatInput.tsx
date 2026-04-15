import styles from "@/app/(pages)/control-center/control-center.module.css"
import { useLocale } from "@/app/hooks/useLocale";
import { useState } from "react";
import type { KeyboardEvent } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
    const [input, setInput] = useState("");
    const locale = useLocale();

    const submit = () => {
        const message = input.trim();
        if(!message) return;
        onSend(message);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            e.preventDefault();
            submit();
        }
    }

    return (
        <div className={styles["chat-input-field"]}>
            <input
                value={input}
                placeholder={locale.chat.placeholder}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            <button
                className="txt-button"
                onClick={submit}
            >
                {locale.chat.send}
            </button>
        </div>
    );
}
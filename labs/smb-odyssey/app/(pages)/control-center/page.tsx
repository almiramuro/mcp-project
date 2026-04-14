"use client";

import styles from "@/app/(pages)/control-center/control-center.module.css"
import ChatSidePanel from "@/components/ControlCenter/ChatPanel";
import ChatWindow from "@/components/ControlCenter/ChatWindow";

export default function ControlCenter() {
  return (
    <div className="page-wrapper">
      <div className="page-title">
        <h1>Control Center</h1>
      </div>
      <div className={`${styles["control-center-container"]}`}>
        <div>
          <ChatSidePanel />
        </div>
        <div>
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

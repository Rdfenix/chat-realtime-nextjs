"use client";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ChatProps {
  deleteChat: () => void;
  chatTitle: string;
  chatId: any;
}

function ChatRoomCard({ deleteChat, chatTitle, chatId }: ChatProps) {
  return (
    <Link href={`room/${chatId}`} className={styles.chat_room}>
      <span>{chatTitle}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteChat();
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </Link>
  );
}

export default function Chat() {
  function deleteChatRoom(data: string): void {
    console.log(data);
  }

  return (
    <section className={styles.chat_section}>
      <header className={styles.chat_page_header}>
        <h1>Chats room</h1>
        <h2>Select or create a chat room</h2>
      </header>
      <div className={styles.chat_info}>
        <span>
          Qtd of chats <b>(0)</b>
        </span>
      </div>
      <div className={styles.chat_wrapper}>
        <ChatRoomCard
          chatTitle="Chat Title"
          chatId="test"
          deleteChat={() => deleteChatRoom("test")}
        />
      </div>
    </section>
  );
}

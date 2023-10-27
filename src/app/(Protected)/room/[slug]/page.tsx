"use client";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { User } from "@/app/shared/interface/login";
import { ChatMessage } from "@/app/shared/interface/chat";
import { useSelector } from "react-redux";
import { StateReducer } from "@/app/shared/interface/reduxInterface";

type ChatroomProps = {
  user: User;
  message: ChatMessage;
};

type ChatProps = {
  params: { slug: string };
};

function TalkList({ message, user }: ChatroomProps) {
  return (
    <>
      {user.username === message.username ? (
        <div className={styles.chat_row_you}>
          <span className={styles.chat_user_name}>{user.username}</span>
          <div className={`${styles.conversation} ${styles.you}`}>
            {message.message}
          </div>
        </div>
      ) : (
        <div className={styles.chat_row_they}>
          <span className={styles.chat_user_name}>{message.username}</span>
          <div className={`${styles.conversation} ${styles.they}`}>
            {message.message}
          </div>
        </div>
      )}
    </>
  );
}

export default function ChatRoom(props: ChatProps) {
  const user = useSelector((state: StateReducer) => state.UserReducer);
  const room = useSelector((state: StateReducer) => state.RoomReducer?.rooms);
  const roomMessage = useSelector(
    (state: StateReducer) => state.RoomReducer?.messages
  );
  const chatId = props.params.slug;
  const chatName = room.find((data) => data._id === chatId);

  useEffect(() => {
    return function cleanUp() {
      console.log("passei aqui no final");
    };
  });

  return (
    <section className={styles.chat_room_section}>
      <header className={styles.chat_room_header}>
        <Link href="/chat">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>{chatName?.title}</h1>
      </header>
      <div className={styles.chat_room_content}>
        {roomMessage[chatId]?.map((message) => (
          <TalkList key={message._id} user={user} message={message} />
        ))}
      </div>
      <footer className={styles.chat_room_footer}>
        <input
          className={styles.chat_input}
          type="text"
          placeholder="Your message"
        />
        <button className={styles.chat_send_message}>send</button>
      </footer>
    </section>
  );
}

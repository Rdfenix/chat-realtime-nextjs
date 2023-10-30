"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { User } from "@/app/shared/interface/login";
import { ChatMessage } from "@/app/shared/interface/chat";
import { useDispatch, useSelector } from "react-redux";
import { StateReducer } from "@/app/shared/interface/reduxInterface";
import {
  getOneRoomAction,
  jointWithWebsocketRoom,
  leaveRoomAction,
  resetChatAction,
  sendMessageAction,
} from "@/app/core/action";
import { useRouter } from "next/navigation";

type ChatroomProps = {
  userDetail: User;
  message: ChatMessage;
};

type ChatProps = {
  params: { slug: string };
};

function TalkList({ message, userDetail }: ChatroomProps) {
  return (
    <>
      {userDetail.username === message.username ? (
        <div className={styles.chat_row_you}>
          <span className={styles.chat_user_name}>{userDetail.username}</span>
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
  const [userMessage, setUserMessage] = useState("");
  let elementRef: any = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: StateReducer) => state.UserReducer);
  const room = useSelector((state: StateReducer) => state.RoomReducer?.rooms);
  const roomMessage = useSelector(
    (state: StateReducer) => state.RoomReducer?.messages
  );
  const chatId = props.params.slug;
  const chatName = room.find((data) => data?._id === chatId);

  useEffect(() => {
    dispatch(getOneRoomAction(chatId));
    dispatch(jointWithWebsocketRoom(chatId));
  }, [chatId, dispatch]);

  function sendMessage() {
    if (userMessage) {
      const message = { username: user.username, message: userMessage };
      const data = { room: chatId, operation: "MESSAGE", message };
      dispatch(sendMessageAction(data));
      setUserMessage("");
    }
  }

  function backToChatHall(id: string) {
    dispatch(resetChatAction());
    dispatch(leaveRoomAction(id));
    router.push("/chat");
  }

  return (
    <section className={styles.chat_room_section}>
      <header className={styles.chat_room_header}>
        <button onClick={() => backToChatHall(chatId)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>{chatName?.title}</h1>
      </header>
      <div ref={elementRef} className={styles.chat_room_content}>
        {roomMessage[chatId]?.map((message, index) => (
          <TalkList
            key={index.toString()}
            userDetail={user}
            message={message}
          />
        ))}
      </div>
      <footer className={styles.chat_room_footer}>
        <input
          className={styles.chat_input}
          type="text"
          placeholder="Your message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button
          className={styles.chat_send_message}
          onClick={() => sendMessage()}
        >
          send
        </button>
      </footer>
    </section>
  );
}

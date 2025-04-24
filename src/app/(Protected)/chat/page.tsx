"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  createUserRoomAction,
  deleteUserRoomAction,
  getChatRoomsAction,
  jointWithWebsocketRoom,
} from "@/app/core/action";
import { StateReducer } from "@/app/shared/interface/reduxInterface";
import { ChatRoom } from "@/app/shared/interface/chat";
import { User } from "@/app/shared/interface/login";

interface ChatProps {
  readonly chatTitle: string;
  readonly chatId: any;
  readonly showDeleteButton: boolean;
}

function ChatRoomCard({ chatTitle, chatId, showDeleteButton }: ChatProps) {
  const dispatch = useDispatch();

  function deleteChat(data: string): void {
    dispatch(deleteUserRoomAction(data));
  }
  return (
    <Link href={`room/${chatId}`} className={styles.chat_room}>
      <span>{chatTitle}</span>
      {showDeleteButton ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteChat(chatId);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ) : (
        <></>
      )}
    </Link>
  );
}

export default function Chat() {
  const [chatName, setChatName] = useState("");
  const dispatch = useDispatch();
  let elementRef: any = useRef();

  useEffect(() => {
    dispatch(getChatRoomsAction());
    dispatch(jointWithWebsocketRoom("HALL"));
  }, [dispatch]);

  const rooms: ChatRoom[] = useSelector(
    (state: StateReducer) => state.RoomReducer?.rooms
  );
  const user: User = useSelector((state: StateReducer) => state.UserReducer);
  const counterRooms = rooms ? rooms.length : 0;

  function toggleArea() {
    if (
      elementRef.current.style.maxHeight &&
      elementRef.current.style.maxHeight !== "0px"
    ) {
      elementRef.current.style.maxHeight = "0px";
    } else {
      elementRef.current.style.maxHeight = `${
        elementRef.current.scrollHeight + 30
      }px`;
    }
  }

  function setNameOfRoom(data: string) {
    setChatName(data);
  }

  function createRoom() {
    if (chatName) {
      /** action to create chat room  */
      const data = { username: user.username, title: chatName };
      dispatch(createUserRoomAction(data));
      setChatName("");
    }
  }

  return (
    <section className={styles.chat_section}>
      <header className={styles.chat_page_header}>
        <h1>Chats room</h1>
        <h2>Select or create a chat room</h2>
      </header>
      <div className={styles.chat_create_area}>
        <button
          className={styles.chat_toggle_create_area}
          onClick={() => toggleArea()}
        >
          <FontAwesomeIcon icon={faPlus} />
          Create chat room
        </button>
        <div ref={elementRef} className={styles.chat_create_input}>
          <input
            className={styles.chat_input_name}
            type="text"
            value={chatName}
            onChange={(e) => setNameOfRoom(e.target.value)}
            placeholder="Room name"
          />
          <button
            className={styles.chat_submit_button}
            onClick={() => createRoom()}
          >
            Submit
          </button>
        </div>
      </div>
      <div className={styles.chat_info}>
        <span>
          Qtd of chats <b>({counterRooms})</b>
        </span>
      </div>
      <div className={styles.chat_wrapper}>
        {rooms?.map((room, index) => (
          <ChatRoomCard
            key={index.toString()}
            chatTitle={room?.title}
            chatId={room._id}
            showDeleteButton={room.username === user.username}
          />
        ))}
      </div>
    </section>
  );
}

"use client";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <section className={styles.home_section}>
      <div className={styles.home_container}>
        <h1>Welcome !</h1>
        <div className={styles.home_content}>
          <span>This is presentation application over websocket</span>
          <span>
            here will be shown how to navigate between chats and how to create
            new chat rooms
          </span>
          <span>So lets talk</span>
        </div>
      </div>
    </section>
  );
}

"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faComment,
  faDoorOpen,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import logoIcon from "@/app/shared/icons/Let_s_Talk.png";

interface RestrictAreaLayoutProps {
  children: ReactNode;
}

export default function RestrictAreaLayout({
  children,
}: RestrictAreaLayoutProps) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const currentRoute = usePathname();

  function toogleSideBar(): void {
    setOpened(!opened);
  }

  function setActiveClass(path: string): string {
    return currentRoute.includes(path) ? styles.active_link : "";
  }

  function logout(): void {
    router.push("/");
  }

  const activeAdded = opened
    ? `${styles.sidebar} ${styles.active}`
    : ` ${styles.sidebar}`;

  const headerText = opened ? "Close" : "Open";

  return (
    <>
      <aside className={activeAdded}>
        <header className={styles.logo_content} onClick={() => toogleSideBar()}>
          <Image priority width={60} height={60} src={logoIcon} alt="logo" />
          <span>{headerText}</span>
        </header>
        <ul className={styles.nav_list}>
          <li>
            <Link className={setActiveClass("chat")} href="/chat">
              <FontAwesomeIcon icon={faComment} inverse />
              <span className={styles.link_name}>Chats</span>
            </Link>
          </li>
          <li>
            <Link className={setActiveClass("main")} href="/main">
              <FontAwesomeIcon icon={faHouse} inverse />
              <span className={styles.link_name}>Home</span>
            </Link>
          </li>
        </ul>
        <div className={styles.profile_content}>
          <div className={styles.profile}>
            <div className={styles.profile_details}>
              <FontAwesomeIcon
                className={styles.user_icon}
                icon={faCircleUser}
                inverse
                fontSize={30}
              />
              <div className={styles.user_detail}>
                <span>User</span>
                <span>Login</span>
              </div>
            </div>
          </div>
          <div className={styles.logout}>
            <button className={styles.logout_button} onClick={() => logout()}>
              <FontAwesomeIcon icon={faDoorOpen} inverse fontSize={20} />
            </button>
          </div>
        </div>
      </aside>
      <section className={styles.principal_content}>{children}</section>
    </>
  );
}

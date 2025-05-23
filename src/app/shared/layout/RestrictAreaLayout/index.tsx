"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { StateReducer } from "../../interface/reduxInterface";
import {
  connectWebsocketAction,
  getUserAction,
  logoutWSAction,
  resetChatAction,
} from "@/app/core/action";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface RestrictAreaLayoutProps {
  readonly children: ReactNode;
}

export default function RestrictAreaLayout({
  children,
}: RestrictAreaLayoutProps) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentRoute = usePathname();
  const userData = useSelector((state: StateReducer) => state.UserReducer);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router, token]);

  useEffect(() => {
    if (token) {
      dispatch(getUserAction());
      dispatch(connectWebsocketAction());
    }
  }, [dispatch, token]);

  function toogleSideBar(): void {
    setOpened(!opened);
  }

  function setActiveClass(path: string): string {
    return currentRoute.includes(path) ? styles.active_link : "";
  }

  function logout(): void {
    localStorage.clear();
    dispatch(logoutWSAction());
    dispatch(resetChatAction());
    router.push("/");
  }

  const activeAdded = opened
    ? `${styles.sidebar} ${styles.active}`
    : ` ${styles.sidebar}`;

  const headerText = opened ? "Close" : "Open";

  return (
    <>
      <aside className={activeAdded}>
        <button
          className={styles.logo_content}
          onClick={() => toogleSideBar()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toogleSideBar();
            }
          }}
          tabIndex={0}
        >
          <Image priority width={60} height={60} src={logoIcon} alt="logo" />
          <span>{headerText}</span>
        </button>
        <ul className={styles.nav_list}>
          <li>
            <Link className={setActiveClass("chat")} href="/chat">
              <FontAwesomeIcon icon={faComment as IconProp} inverse />
              <span className={styles.link_name}>Chats</span>
            </Link>
          </li>
          <li>
            <Link className={setActiveClass("main")} href="/main">
              <FontAwesomeIcon icon={faHouse as IconProp} inverse />
              <span className={styles.link_name}>Home</span>
            </Link>
          </li>
        </ul>
        <div className={styles.profile_content}>
          <div className={styles.profile}>
            <div className={styles.profile_details}>
              <FontAwesomeIcon
                className={styles.user_icon}
                icon={faCircleUser as IconProp}
                inverse
                fontSize={30}
              />
              <div className={styles.user_detail}>
                <span>{userData?.name}</span>
                <span>{userData?.username}</span>
              </div>
            </div>
          </div>
          <div className={styles.logout}>
            <button className={styles.logout_button} onClick={() => logout()}>
              <FontAwesomeIcon icon={faDoorOpen as IconProp} inverse fontSize={20} />
            </button>
          </div>
        </div>
      </aside>
      <section className={styles.principal_content}>{children}</section>
    </>
  );
}

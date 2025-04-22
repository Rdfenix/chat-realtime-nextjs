"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import logo from "@/app/shared/icons/Let_s_Talk.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const TOKEN_KEY = "token";
const MAIN_PAGE = "/main";
const SIGNIN_PAGE = "/signin";

const redirectToMain = (router: AppRouterInstance, token: string | null) => {
  if (token) {
    router.push(MAIN_PAGE);
  }
};

export default function Home() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : "";

  useEffect(() => {
    redirectToMain(router, token);
  }, [router, token]);

  return (
    <section className={styles.home_section}>
      <Image src={logo} priority alt="logo" />
      <Link href={SIGNIN_PAGE}>
        <span>Sign In / Sign On</span>
      </Link>
    </section>
  );
}

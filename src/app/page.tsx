"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import logo from "@/app/shared/icons/Let_s_Talk.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (token) {
      router.push("/main");
    }
  }, [router, token]);

  return (
    <section className={styles.home_section}>
      <Image src={logo} priority alt="logo" />
      <Link href="/signin">
        <span>Sign In / Sign On</span>
      </Link>
    </section>
  );
}

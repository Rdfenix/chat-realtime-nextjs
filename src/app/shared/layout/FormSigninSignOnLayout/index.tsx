"use client";
import { ReactNode } from "react";
import Image from "next/image";
import logo from "@/app/shared/icons/Let_s_Talk.png";
import styles from "./index.module.scss";

interface FormSigninSignOnLayoutProps {
  children: ReactNode;
  titleHeader: string;
}

export default function FormSigninSignOnLayout({
  children,
  titleHeader,
}: FormSigninSignOnLayoutProps) {
  return (
    <div className={styles.login_form}>
      <header>
        <Image src={logo} width={45} height={45} alt="logo" />
        <span>{titleHeader}</span>
      </header>
      {children}
    </div>
  );
}

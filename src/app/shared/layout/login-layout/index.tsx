"use client";
import { ReactNode } from "react";
import styles from "./login-layout.module.scss";

interface SignInSignOutLayoutProps {
  children: ReactNode;
}

function SignInSignOutLayout({ children }: SignInSignOutLayoutProps) {
  return <section id={styles.signin_signout_section}>{children}</section>;
}

export default SignInSignOutLayout;

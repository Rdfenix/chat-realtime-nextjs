"use client";
import { ReactNode, useEffect } from "react";
import styles from "./login-layout.module.scss";
import { useRouter } from "next/navigation";

interface SignInSignOutLayoutProps {
  readonly children: ReactNode;
}

function SignInSignOutLayout({ children }: SignInSignOutLayoutProps) {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (token) {
      router.push("/main");
    }
  }, [router, token]);

  return <section id={styles.signin_signout_section}>{children}</section>;
}

export default SignInSignOutLayout;

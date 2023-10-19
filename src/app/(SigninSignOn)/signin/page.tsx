"use client";
import FormSigninSignOnLayout from "@/app/shared/layout/FormSigninSignOnLayout";
import SignInSignOutLayout from "@/app/shared/layout/login-layout";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./index.module.scss";

function LoginForm() {
  return (
    <FormSigninSignOnLayout titleHeader="Sign In">
      <form className={styles.form}>
        <input type="text" className={styles.login_input} placeholder="Login" />
        <input
          type="password"
          className={styles.login_input}
          placeholder="Password"
        />
      </form>
      <footer className={styles.login_footer}>
        <div className={styles.button_area}>
          <button className={styles.submit_button}>Submit</button>
        </div>
        <div className={styles.register_area}>
          <Link href="/signon">
            <span>Register</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </footer>
    </FormSigninSignOnLayout>
  );
}

export default function Signin() {
  return (
    <SignInSignOutLayout>
      <LoginForm />
    </SignInSignOutLayout>
  );
}

"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import styles from "./index.module.scss";
import FormSigninSignOnLayout from "@/app/shared/layout/FormSigninSignOnLayout";
import SignInSignOutLayout from "@/app/shared/layout/login-layout";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signinAction } from "@/app/core/action";

function LoginForm() {
  const dispatch = useDispatch<any>();
  const [signInData, setSignInData] = useState({ username: "", password: "" });

  function settingCredentials(data: string, field: string): void {
    const item = { ...signInData, [field]: data };

    setSignInData(item);
  }

  function signInUser(): void {
    dispatch(signinAction(signInData));
  }

  return (
    <FormSigninSignOnLayout titleHeader="Sign In">
      <form className={styles.form}>
        <input
          type="text"
          className={styles.login_input}
          placeholder="Login"
          value={signInData.username}
          onChange={(e) => settingCredentials(e.target.value, "username")}
        />
        <input
          type="password"
          className={styles.login_input}
          placeholder="Password"
          value={signInData.password}
          onChange={(e) => settingCredentials(e.target.value, "password")}
        />
      </form>
      <footer className={styles.login_footer}>
        <div className={styles.button_area}>
          <button
            className={styles.submit_button}
            onClick={(e) => {
              e.preventDefault();
              signInUser();
            }}
          >
            Submit
          </button>
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

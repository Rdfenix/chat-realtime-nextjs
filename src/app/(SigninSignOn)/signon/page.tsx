"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.scss";
import FormSigninSignOnLayout from "@/app/shared/layout/FormSigninSignOnLayout";
import SignInSignOutLayout from "@/app/shared/layout/login-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { signUpAction } from "@/app/core/action";

function RegisterForm() {
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    name: "",
  });

  function settingCredentials(data: string, field: string): void {
    const item = { ...signUpData, [field]: data };

    setSignUpData(item);
  }

  function signInUser(): void {
    if (signUpData.name && signUpData.username && signUpData.password) {
      dispatch(signUpAction(signUpData));
    }
  }

  return (
    <FormSigninSignOnLayout titleHeader="Sign On">
      <form className={styles.form_register}>
        <input
          className={styles.register_input}
          type="text"
          placeholder="Name"
          value={signUpData.name}
          onChange={(e) => settingCredentials(e.target.value, "name")}
        />
        <input
          className={styles.register_input}
          type="text"
          placeholder="Add a login; Ex: test.o"
          value={signUpData.username}
          onChange={(e) => settingCredentials(e.target.value, "username")}
        />
        <input
          className={styles.register_input}
          type="password"
          placeholder="Password"
          value={signUpData.password}
          onChange={(e) => settingCredentials(e.target.value, "password")}
        />
      </form>
      <footer className={styles.register_footer}>
        <div className={styles.button_area}>
          <button
            type="button"
            className={styles.sign_up_button}
            onClick={() => signInUser()}
          >
            Register
          </button>
        </div>
        <div className={styles.sign_in_area}>
          <Link href="/signin">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Sign In</span>
          </Link>
        </div>
      </footer>
    </FormSigninSignOnLayout>
  );
}

function SignOn() {
  return (
    <SignInSignOutLayout>
      <RegisterForm />
    </SignInSignOutLayout>
  );
}

export default SignOn;

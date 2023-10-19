"use client";
import FormSigninSignOnLayout from "@/app/shared/layout/FormSigninSignOnLayout";
import SignInSignOutLayout from "@/app/shared/layout/login-layout";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function RegisterForm() {
  return (
    <FormSigninSignOnLayout titleHeader="Sign On">
      <form className={styles.form_register}>
        <input
          className={styles.register_input}
          type="text"
          placeholder="Name"
        />
        <input
          className={styles.register_input}
          type="text"
          placeholder="Add a login; Ex: test.o"
        />
        <input
          className={styles.register_input}
          type="password"
          placeholder="Password"
        />
      </form>
      <footer className={styles.register_footer}>
        <div className={styles.button_area}>
          <button className={styles.sign_up_button}>Register</button>
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

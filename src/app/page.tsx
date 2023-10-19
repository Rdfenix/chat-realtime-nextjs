import styles from "./page.module.scss";
import Image from "next/image";
import logo from "@/app/shared/icons/Let_s_Talk.png";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles.home_section}>
      <Image src={logo} priority alt="logo" />
      <Link href="/signin">
        <span>Sign In / Sign On</span>
      </Link>
    </section>
  );
}

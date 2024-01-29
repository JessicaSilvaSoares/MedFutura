"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {pathname.match(/\/pedido\/\d+/) && (
        <button className={styles.header__btn} onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <h1 className={styles.header__logo}>MedFutura</h1>
    </header>
  );
}

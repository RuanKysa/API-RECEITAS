import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image src="/images/logo2.png" width="40" height="40" alt="Bueno Tech"></Image>
                <h1>Bueno Tech</h1>
            </div>
            <ul className={styles.link_items}>
                <li>
                    <Link legacyBehavior href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/about">
                        <a>About</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/about">
                        <a>Tutorial</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/store">
                        <a>Store</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior target="blank" href="https://w.app/BuenoTech" >
                        <a>Contact</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/profile">
                        <a>Profile</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
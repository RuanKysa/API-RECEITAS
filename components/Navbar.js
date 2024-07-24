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
                        <a>Store</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/about">
                        <a>Contact</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/about">
                        <a>Profile</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
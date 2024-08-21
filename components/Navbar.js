import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image src="/images/logo2.png" width="40" height="40" alt="Bueno Tech" />
                <h1>R&R RECEITAS</h1>
            </div>
            <div className={styles.menu_toggle} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={`${styles.link_items} ${isMenuOpen ? styles.active : ''}`}>
                <li>
                    <Link legacyBehavior href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/store">
                        <a>Cardápio</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/chef">
                        <a>Nova Receita</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

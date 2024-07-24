import Link from "next/link"
import styles from "../styles/Card.module.css"
import Image from "next/image"


export default function Card() {
    return (
        <div className={styles.card}>
            <Image 
                src=""
                width="120"
                height="120"
                alt="img"
            />
            <p className={styles.id}>#id-produto</p>
            <h3 className={styles.title}>Produto</h3>
            <Link legacyBehavior href="">
            <a className={styles.btn}>View Details</a>
            </Link>
        </div>
    );
}
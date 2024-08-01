import Link from "next/link";
import styles from "../styles/Card.module.css";
import Image from "next/image";

export default function Card({ product }) {
    return (
        <div className={styles.card}>
            <Image
                src={product.image}
                width="120"
                height="120"
                alt={product.name}
            />
            <p className={styles.id}>#{product.id}</p>
            <h3 className={styles.title}>{product.name}</h3>
            <Link legacyBehavior href={`/product/${product.id}`}>
                <a className={styles.btn}>View Details</a>
            </Link>
        </div>
    );
}

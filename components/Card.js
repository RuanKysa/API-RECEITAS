import Link from "next/link";
import styles from "../styles/Card.module.css";
import Image from "next/image";

export default function Card({ product }) {
    return (
        <div className={styles.card}>
            {product.imagem && (
                <Image
                    src={product.imagem}
                    width={120}
                    height={120}
                    alt={product.titulo}
                    layout="intrinsic"
                />
            )}
            <p className={styles.id}>#{product.id}</p>
            <h3 className={styles.title}>{product.titulo}</h3>
            <Link legacyBehavior href={`/receita/${product.id}`}>
                <a className={styles.btn}>Detalhes da Receita</a>
            </Link>

        </div>
    );
} 

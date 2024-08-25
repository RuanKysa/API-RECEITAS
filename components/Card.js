import Link from "next/link";
import styles from "../styles/Card.module.css";
import Image from "next/image";

export default function Card({ receita }) {
    return (
        <div className={styles.card}>
            {receita.imagem && (
                <Image
                    src={receita.imagem}
                    width={120}
                    height={120}
                    alt={receita.titulo}
                    layout="intrinsic"
                />
            )}
            <h3 className={styles.title}>{receita.titulo}</h3>
            <Link legacyBehavior href={`/receita/${receita.id}`}>
                <a className={styles.btn}>Detalhes da Receita</a>
            </Link>
        </div>
    );
}

import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <header className={styles.cabecalho}>
                    <h1 className={styles.titulo}>Bem-vindo a R&R RECEITAS</h1>
                    <p className={styles.site}>Descubra e compartilhe receitas incríveis!</p>

                    <div className={styles.botoes}>
                        <Link legacyBehavior href="/store">
                            <a className={styles.botao}>Ver Receitas</a>
                        </Link>
                        <Link legacyBehavior href="/chef">
                            <a className={styles.botao}>Adicionar Receita</a>
                        </Link>
                    </div>
                </header>

                <div className={styles.fundoImagem}>
                    <img src="/images/fundo.svg" alt="Fundo de receitas" className={styles.imagemFundo} />
                </div>
            </div>
        </>
    );
}

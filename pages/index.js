import styles from "@/styles/Home.module.css";


export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.overlay}></div>

                <div className={styles.content}>
                    <h1 className={styles.title}>Bem-vindo ao Receitas Deliciosas</h1>
                    <p className={styles.subtitle}>Descubra e compartilhe receitas incríveis de todo o mundo!</p>
                </div>
            </div>
        </>
    );
}
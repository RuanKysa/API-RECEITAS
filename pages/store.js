import styles from "@/styles/Store.module.css";
import Card from "../components/Card";

export default function Home({ receitas }) {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {receitas.map((receita) => (
                    <Card key={receita.id} product={receita} />
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/receitas');
    const receitas = await res.json();

    return {
        props: {
            receitas,
        },
    };
}

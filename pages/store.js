import styles from "@/styles/Store.module.css";
import Card from "../components/Card";

export default function Store({ receitas }) {
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
    try {
        const res = await fetch('https://api-url-vy6n.onrender.com/receita');
        if (!res.ok) throw new Error('Erro ao carregar receitas.');
        const receitas = await res.json();

        return {
            props: {
                receitas,
            },
            revalidate: 10, 
        };
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return {
            props: {
                receitas: [],
            },
        };
    }
}

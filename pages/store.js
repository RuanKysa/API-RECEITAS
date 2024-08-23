import fs from 'fs';
import path from 'path';
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
    const filePath = path.join(process.cwd(), 'data', 'receitas.json');
    const jsonData = fs.readFileSync(filePath);
    const receitas = JSON.parse(jsonData);

    return {
        props: {
            receitas,
        },
    };
}

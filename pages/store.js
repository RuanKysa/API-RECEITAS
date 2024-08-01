import styles from "@/styles/Store.module.css";
import Card from "../components/Card";

export default function Home({ products }) {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();

    return {
        props: {
            products,
        },
    };
}

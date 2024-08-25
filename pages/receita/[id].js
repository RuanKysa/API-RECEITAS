import styles from "../../styles/detalhe.module.css";

export async function getStaticPaths() {
    try {
        const res = await fetch('https://api-url-vy6n.onrender.com/receita');
        if (!res.ok) throw new Error('Erro ao carregar receitas.');
        const receitas = await res.json();

        const paths = receitas.map((receita) => ({
            params: { id: receita.id.toString() },
        }));

        return { paths, fallback: false };
    } catch (error) {
        console.error('Erro ao buscar caminhos:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`https://api-url-vy6n.onrender.com/receita/${params.id}`);
        if (!res.ok) throw new Error('Erro ao carregar receita.');
        const receita = await res.json();

        return { props: { receita } };
    } catch (error) {
        console.error('Erro ao buscar dados da receita:', error);
        return { props: { receita: null } };
    }
}

export default function Detalhes({ receita }) {
    if (!receita) {
        return <h1>Receita não encontrada</h1>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{receita.titulo}</h1>
            <img className={styles.image} src={receita.imagem} alt={receita.titulo} />
            <h3>Ingredientes:</h3>
            <ul className={styles.ingredients}>
                {receita.ingredientes.map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                ))}
            </ul>
            <h3>Modo de Preparo:</h3>
            <p className={styles.preparation}>{receita.modoPreparo}</p>
            <div className={styles.timeinfo}>
                <p>Tempo de Preparo: {receita.tempoPreparo} minutos</p>
                <p>Tempo de Cozimento: {receita.tempoCozimento} minutos</p>
            </div>
        </div>
    );
}

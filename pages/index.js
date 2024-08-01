import styles from "@/styles/Home.module.css";
import Image from "next/image";


export default function Home() {
    return (
        <>
           <div className={styles.container}>
           <h1 className={styles.title}>Welcome to my website</h1>
                <button className={styles.btn}>Explore Tutoriais</button>
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to my website</h1>
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to my website</h1>
            </div>
        </>
    )
}




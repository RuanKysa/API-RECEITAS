import Navbar from "./Navbar"
import Footer from "./Footer"


import Head from "next/head"

export default function LayoutRouter({children}){
    return (
        <>
        <Head>
            <link rel="shortcut icon" href="/images/Favicon.ico" />
            <title>Bueno Tech</title>
        </Head>
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
        </>
    )
}
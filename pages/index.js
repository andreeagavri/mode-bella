import Head from "next/head";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import { ProductGridItem } from "../components/ProductGridItem";
import { Navigation } from "../components/Navigation";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { NavMenu } from "../components/NavMenu";
import { Title } from "../components/Title";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Moda Bella</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.main}>
        <Title />
        <NavMenu></NavMenu>
      </main>
    </div>
  );
}

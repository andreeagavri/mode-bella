import Head from "next/head";
import styles from "../../styles/Home.module.css";
import products from "../../products.json";
import { ProductGridItem } from "../../components/ProductGridItem";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavMenu } from "../../components/NavMenu";
import { FilterGroup } from "../../components/FilterGroup";
import { capitalize } from "../../utils";

export default function Haine() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showColorSwatches, setShowColorSwatches] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);

  function applyFilters() {
    let filteredProducts = products.filter((prod) => {
      if (filterColors.length === 0) {
        return true;
      }
      if (filterColors.includes(prod.color)) {
        return true;
      }
      return false;
    });

    filteredProducts = filteredProducts.filter(
      (prod) => prod.price >= priceRange[0] && prod.price <= priceRange[1]
    );
    setFilteredProducts(filteredProducts);
  }

  const slugToHaine = {
    "bluze-si-tricouri": "bluze si tricouri",
    pantaloni: "pantaloni",
    rochii: "rochii",
    fuste: "fuste",
    "geci-si-paltoane": "geci si paltoane",
    "imbracaminte-sport": "imbracaminte sport",
    sacouri: "sacouri",
  };

  const router = useRouter();
  const { tipHaina } = router.query;

  let haina;
  if (tipHaina) {
    haina = slugToHaine[tipHaina];
  }

  useEffect(() => {
    if (haina) {
      const unsubscribe = db
        .collection("products")
        .where("type", "==", haina)
        .onSnapshot((snap) => {
          const dbProducts = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(dbProducts);
          setFilteredProducts(dbProducts);
        });
      return () => unsubscribe();
    }
  }, [haina]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Moda Bella</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.main}>
        <Link href="/">
          <h1 className={styles.title}>MODA BELLA</h1>
        </Link>
        <NavMenu></NavMenu>
        <h1 className={styles.pageTitle}>{capitalize(haina)}</h1>

        <FilterGroup
          showColorSwatches={showColorSwatches}
          setShowColorSwatches={setShowColorSwatches}
          filterColors={filterColors}
          setFilterColors={setFilterColors}
          showPriceRange={showPriceRange}
          setShowPriceRange={setShowPriceRange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <div
          className={styles.applyFiltersButton}
          onClick={() => applyFilters()}
        >
          Aplicați filtrele
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((prod) => (
            <ProductGridItem product={prod} />
          ))}
        </div>
      </main>
    </div>
  );
}

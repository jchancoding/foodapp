import React, { useEffect, useState } from "react";
import styles from "./search.module.css";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("curry");
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  // useEffect to call API when query changes
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(URL);
      const data = await res.json();
      setFoodData(data.meals);
    }
    fetchFood();
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <h2>Search By Name</h2>
      <input
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );
}

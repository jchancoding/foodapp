import React, { useEffect, useState } from "react";
import styles from "./fooditem.module.css";

export default function FoodItem({ food, setFoodId }) {
  const [foodName, setFoodName] = useState("");

  useEffect(() => {
    if (food.strMeal && food.strMeal.length > 0) {
      let foodName = food.strMeal;
      foodName = foodName
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
      setFoodName(foodName);
    }
  }, [food]);

  return (
    <div className={styles.itemContainer}>
      <img className={styles.itemImage} src={food.strMealThumb} alt="" />
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{foodName}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            setFoodId(food.idMeal);
          }}
          className={styles.itemButton}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

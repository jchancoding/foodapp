import React, { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";

export default function FoodDetails({ foodId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [foodData, setFoodData] = useState({});
  const [ingredientCount, setIngredientCount] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(URL);
      const data = await res.json();
      setFoodData(data.meals[0]);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  useEffect(() => {
    if (foodData) {
      const countIngredients = () => {
        for (let i = 1; i <= 20; i++) {
          const ingredient = foodData[`strIngredient${i}`];
          if (!ingredient || ingredient.trim() === "") {
            return i - 1; // Return count immediately when empty string is found
          }
        }
        return 20; // Return 20 if all ingredients are non-empty
      };
      setIngredientCount(countIngredients());

      const formatInstructions = () => {
        if (foodData.strInstructions) {
          return foodData.strInstructions
            .split(".")
            .map((instruction) => instruction.trim())
            .filter((instruction) => instruction.length > 0);
        }
        return [];
      };
      setInstructions(formatInstructions());
    }
  }, [foodData]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{foodData.strMeal}</h1>
        <img
          className={styles.recipeImage}
          src={foodData.strMealThumb}
          alt=""
        />
        <div className={styles.recipeDetails}>
          <span>
            <strong>🌎Area:{foodData.strArea}</strong>
          </span>
          <span>
            <strong>🍽️Type:{foodData.strCategory}</strong>
          </span>
          <span>
            <strong>🌿Ingredients:{ingredientCount}</strong>
          </span>
        </div>
        <div>
          <span>
            <strong>
              Source: <a href={foodData.strSource}>{foodData.strSource}</a>
            </strong>
          </span>
        </div>
        <h2>Cooking Instructions</h2>
        <div className={styles.recipeInstructions}>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <ol>
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

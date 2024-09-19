import React, { useEffect, useState } from "react";

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
      <div>
        <h1>{foodData.strMeal}</h1>
        <img src={foodData.strMealThumb} alt="" />
      </div>
      <div>
        <span>
          <strong>🌎Cuisine: {foodData.strArea}</strong>
        </span>
        <span>
          <strong>🍽️Category: {foodData.strCategory}</strong>
        </span>
        <span>
          <strong>🌿Number of Ingredients: {ingredientCount}</strong>
        </span>
      </div>
      <div>
        <span>
          <strong>
            Source: <a href={foodData.strSource}>{foodData.strSource}</a>
          </strong>
        </span>
      </div>
      <div>
        <h2>Cooking Instructions</h2>
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
  );
}

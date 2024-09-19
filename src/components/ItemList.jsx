import React, { useEffect, useState } from "react";

export default function ItemList({
  isLoading,
  foodData,
  ingredients,
  setIngredients,
}) {
  useEffect(() => {
    const extractIngredients = () => {
      const ingredientList = [];
      for (let i = 1; i <= 20; i++) {
        let ingredient = foodData[`strIngredient${i}`];
        let measure = foodData[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          // Capitalize the first letter of each word
          ingredient = ingredient
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ");
          // Check if ingredient and measure are not empty, if measure does not end in space, add a space, push to ingredientList
          if (measure[measure.length - 1] !== " ") {
            measure += " ";
          }
          ingredientList.push({
            ingredient: ingredient,
            measure: measure.toLowerCase(),
          });
        }
      }
      return ingredientList;
    };
    setIngredients(extractIngredients());
  }, [foodData]);

  return (
    <div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={index}>
              {measure} {ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

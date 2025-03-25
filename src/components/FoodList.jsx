import React from "react";
import FoodItem from "./FoodItem";

export default function FoodList({ foodData, setFoodId }) {
  return !foodData ? (
    <div />
  ) : (
    <div>
      {foodData.map((food) => (
        <FoodItem key={food.idMeal} food={food} setFoodId={setFoodId} />
      ))}
    </div>
  );
}

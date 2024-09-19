import { useState } from "react";
import Search from "./components/Search";
import Nav from "./components/Nav";
import FoodList from "./FoodList";
import styles from "./app.module.css";

function App() {
  const [foodData, setFoodData] = useState([]);

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <FoodList foodData={foodData} />
    </div>
  );
}

export default App;

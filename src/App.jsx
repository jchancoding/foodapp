import { useState } from "react";
import Search from "./components/Search";
import Nav from "./components/Nav";
import FoodList from "./FoodList";
import styles from "./app.module.css";
import Container from "./Container";
import InnerContainer from "./InnerContainer";
import FoodDetail from "./FoodDetail";

function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodId, setFoodId] = useState("");

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container>
        <InnerContainer>
          <FoodList foodData={foodData} setFoodId={setFoodId} />
        </InnerContainer>
        <InnerContainer>
          <FoodDetail foodId={foodId} />
        </InnerContainer>
      </Container>
    </div>
  );
}

export default App;

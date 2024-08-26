import { useEffect } from "react";
import { useFoodsContext } from "../hooks/useFoodsContext";

//components
import FoodDetails from "../components/FoodDetails";
import FoodForm from "../components/FoodForm";

const Home = () => {
  const { foods, dispatch }= useFoodsContext()

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch("/api/foods");
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_FOODS', payload: json})
      }
    };

    fetchFoods();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="foods">
        {foods &&
          foods.map((food) => (
            <FoodDetails
              key={food._id}
              food={food}
            ></FoodDetails>
          ))}
      </div>
      <FoodForm />
    </div>
  );
};

export default Home;

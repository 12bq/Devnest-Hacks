import { useFoodsContext } from "../hooks/useFoodsContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const FoodDetails = ({ food }) => {
  const { dispatch } = useFoodsContext();

  const handleClick = async () => {
    const response = await fetch("/api/foods/" + food._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FOOD", payload: json });
    }
  };

  return (
    <div className="food-details">
      <h4>{food.title}</h4>
      <p>Expires: {formatDistanceToNow(new Date(food.date), { addSuffix: true })}</p>
      {/* <p>
        {formatDistanceToNow(new Date(food.createdAt), { addSuffix: true })}
      </p> */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default FoodDetails;

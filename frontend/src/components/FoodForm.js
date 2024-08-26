import { useState } from "react";
import { useFoodsContext } from "../hooks/useFoodsContext";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker"

const FoodForm = () => {
  const { dispatch } = useFoodsContext();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const food = { title, date };

    const response = await fetch("/api/foods", {
      method: "POST",
      body: JSON.stringify(food),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("");
      setDate(null);
      setError(null);
      setEmptyFields([])
      console.log("New food added.", json);
      dispatch({ type: "CREATE_FOOD", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Food</h3>
      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error': ''}
      />
      <label>Date:</label>
      <div>
        <DatePicker
          selected = {date}
          onChange = {(date) => setDate(date)}
          className={emptyFields.includes('date') ? 'error': ''}
        />
      </div>

      <button>Add Food</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default FoodForm;
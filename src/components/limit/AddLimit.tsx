import React, { useState } from "react";
import { useAppDispatch } from "../../redux/redux";
import { addUser } from "../../redux/reducers/ActionCreater";
import { ICar } from "../../redux/model";
import "./addLimit.css";
const AddLimit = () => {
  const dispatch = useAppDispatch();
  const [newUser, setNewUser] = useState<ICar>({
    owner: "",
    car: "",
    numbers: "",
    limit: 0,
    arrest: "false",
    remaining: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(addUser(newUser));
    setNewUser({
      owner: "",
      car: "",
      numbers: "",
      limit: 0,
      arrest: "false",
      remaining: 0,
    });
  };

  return (
    <div className="add-limit-container">
      <h2>Добавить лимит</h2>
      <input
        type="text"
        name="owner"
        placeholder="Владелец"
        value={newUser.owner}
        onChange={handleChange}
      />
      <input
        type="text"
        name="car"
        placeholder="Машина"
        value={newUser.car}
        onChange={handleChange}
      />
      <input
        type="text"
        name="numbers"
        placeholder="Номер"
        value={newUser.numbers}
        onChange={handleChange}
      />
      <input
        type="number"
        name="limit"
        placeholder="Лимит"
        value={newUser.limit}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Добавить</button>
    </div>
  );
};

export default AddLimit;

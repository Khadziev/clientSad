import React, { useState } from "react";
import { useAppDispatch } from "../../redux/redux";
import { ICar } from "../../redux/model";

import styles from "../styles/UpdateUser.module.css";
import { updateUser } from "../../redux/reducers/ActionCreater";

interface UpdateUserProps {
  user: ICar;
  closeModal: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user, closeModal }) => {
  const [owner, setOwner] = useState(user.owner);
  const [car, setCar] = useState(user.car);
  const [numbers, setNumbers] = useState(user.numbers);
  const [limit, setLimit] = useState(user.limit);
  const [arrest, setArrest] = useState(user.arrest);
  const [remaining, setRemaining] = useState(user.remaining);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: ICar = {
      id: user.id,
      owner,
      car,
      numbers,
      limit,
      arrest,
      remaining,
    };

    dispatch(updateUser(updatedUser));
    closeModal();
  };

  return (
    <div className={styles.updateUserContainer}>
      <h2 className={styles.title}>Обновить пользователя</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="owner" className={styles.label}>
            Владелец:
          </label>
          <input
            id="owner"
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="car" className={styles.label}>
            Машина:
          </label>
          <input
            id="car"
            type="text"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numbers" className={styles.label}>
            Номер:
          </label>
          <input
            id="numbers"
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="limit" className={styles.label}>
            Лимит:
          </label>
          <input
            id="limit"
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseFloat(e.target.value))}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="arrest" className={styles.label}>
            Арест:
          </label>
          <select
            id="arrest"
            value={arrest}
            onChange={(e) => setArrest(e.target.value)}
            className={styles.select}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="remaining" className={styles.label}>
            Оставшийся:
          </label>
          <input
            id="remaining"
            type="number"
            value={remaining}
            onChange={(e) => setRemaining(parseFloat(e.target.value))}
            className={styles.input}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            Обновить пользователя
          </button>
          <button type="button" className={styles.button} onClick={closeModal}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;

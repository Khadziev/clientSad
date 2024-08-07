import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/redux";
import LimitFetch from "./LimitFetch";
import "../styles/limitFetching.css";
import "../styles/search.css";
import { fetchUsers, searchUsers } from "../../redux/reducers/ActionCreater";
import AddLimit from "./AddLimit";
import Modal from "../styles/modal";

const LimitAll: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const { users, filteredUsers, isLoading, error } = useAppSelector(
    (state) => state.user
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    const now = new Date();
    setCurrentMonth(months[now.getMonth()]);
  }, []);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    dispatch(searchUsers(searchTerm));
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={handleAddClick}>Добавить</button>
          <Modal showModal={showModal} closeModal={closeModal}>
            <AddLimit />
          </Modal>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="поиск по базе..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div style={{ textAlign: "center" }}>{currentMonth}</div>
      <div className="limit-all-container">
        {isLoading ? (
          <div>Загрузка...</div>
        ) : error ? (
          <div>Ошибка: {error}</div>
        ) : searchTerm.length === 0 ? (
          users.map((item) => <LimitFetch key={item.id} items={item} />)
        ) : (
          filteredUsers.map((item) => <LimitFetch key={item.id} items={item} />)
        )}
      </div>
    </div>
  );
};

export default LimitAll;

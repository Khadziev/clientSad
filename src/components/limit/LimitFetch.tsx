import React, { useState } from "react";
import { useAppDispatch } from "../../redux/redux";
import { ICar } from "../../redux/model";
import "../styles/limitFetching.css";
import Modal from "../styles/modal";
import {
  updateArrestStatus,
  updateRemaining,
  resetRemainingToLimit,
  toggleTicket,
  deleteUser,
} from "../../redux/reducers/ActionCreater";

import { FaGasPump, FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";
import { AiTwotoneUnlock } from "react-icons/ai";
import "../styles/addZapravka.css";
import UpdateUser from "./UpdateUser";

interface ILimit {
  items: ICar;
}

const LimitFetch: React.FC<ILimit> = ({ items }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [refuelAmount, setRefuelAmount] = useState<number | string>("");
  const [remaining, setRemaining] = useState<number>(items.remaining);
  const [editMode, setEditMode] = useState(false);

  const handleArrestToggle = () => {
    const newArrestStatus = items.arrest === "true" ? "false" : "true";
    dispatch(updateArrestStatus(items.id, newArrestStatus));
  };

  const handleRefuelClick = () => {
    setShowModal(true);
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    dispatch(deleteUser(items.id));
  };

  const handleEditClick = () => {
    setShowModal(true);
    setEditMode(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRefuelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRefuelAmount(value);
  };

  const handleRefuelSubmit = () => {
    const refuel =
      typeof refuelAmount === "string"
        ? parseFloat(refuelAmount)
        : refuelAmount;
    if (!isNaN(refuel) && refuel > 0) {
      const newRemaining = remaining - refuel;
      setRemaining(newRemaining);
      dispatch(updateRemaining(items.id, newRemaining));
      closeModal();
    }
  };

  const handleResetRemaining = () => {
    setRemaining(items.limit);
    dispatch(resetRemainingToLimit(items.id, items.limit));
  };

  const handleTicketClick = (ticket: "ticket1" | "ticket2") => {
    dispatch(toggleTicket(items.id, ticket));
  };

  return (
    <div
      className={`limit-fetch-container ${
        items.arrest === "true" ? "arrested" : ""
      }`}
    >
      <div className="info-card">
        <div className="info-block">
          <div className="label">Машина:</div>
          <div className="value">{items.car}</div>
        </div>
        <div className="info-block">
          <div className="label">Лимит:</div>
          <div className="value">{items.limit}</div>
        </div>
        <div className="info-block">
          <div className="label">Остаток:</div>
          <div className="value">{remaining}</div>
        </div>
        <div className="info-block">
          <div className="label">Владелец:</div>
          <div className="value">{items.owner}</div>
        </div>
        <div className="info-block">
          <div className="label">Номер:</div>
          <div className="value">{items.numbers}</div>
        </div>
        <div className="action-icons">
          <button className="action-button" onClick={handleArrestToggle}>
            <AiTwotoneUnlock />
          </button>
          <button className="action-button" onClick={handleRefuelClick}>
            <FaGasPump />
          </button>
          <button className="action-button" onClick={handleEditClick}>
            <FaEdit />
          </button>
          <button className="action-button" onClick={handleDeleteClick}>
            <FaTrashAlt />
          </button>
          <button className="action-button" onClick={handleResetRemaining}>
            <FaUndo />
          </button>
        </div>
      </div>
      <div className="ticket-container">
        <div>
          <div>путевки сдал:</div>
        </div>
        <p
          onClick={() => handleTicketClick("ticket1")}
          className={`ticket ${items.ticket1 ? "ticket-done" : ""}`}
        >
          1
        </p>
        <p
          onClick={() => handleTicketClick("ticket2")}
          className={`ticket ${items.ticket2 ? "ticket-done" : ""}`}
        >
          2
        </p>
      </div>
      <Modal showModal={showModal} closeModal={closeModal}>
        {editMode ? (
          <UpdateUser user={items} closeModal={closeModal} />
        ) : (
          <div>
            <h2>Информация о заправке</h2>
            <p>Машина {items.car} была заправлена.</p>
            <input
              type="number"
              value={refuelAmount}
              onChange={handleRefuelChange}
              placeholder="Введите количество топлива"
            />
            <button onClick={handleRefuelSubmit}>Подтвердить</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LimitFetch;

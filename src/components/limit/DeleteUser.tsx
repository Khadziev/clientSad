import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/redux";
import { deleteUser } from "../../redux/reducers/ActionCreater";
import "../styles/deleteUser.css";

const DeleteUser = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleDelete = () => {
    if (selectedUserId !== null) {
      dispatch(deleteUser(selectedUserId));
      setSelectedUserId(null);
    }
  };

  return (
    <div className="delete-user-container">
      <h2>Удалить пользователя</h2>
      <select value={selectedUserId ?? ""} onChange={(e) => setSelectedUserId(Number(e.target.value))}>
        <option value="" disabled>
          Выберите пользователя
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.owner}
          </option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={selectedUserId === null}>
        Удалить
      </button>
    </div>
  );
};

export default DeleteUser;

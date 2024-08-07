import axios from "axios";
import { AppDispatch, RootState } from "../store";
import { ICar } from "../model";
import { userSlice } from "./UserSlice";

const BASE_URL = "https://apisad.vercel.app/cars";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await axios.get<ICar[]>(BASE_URL);
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
  } catch (e) {
    dispatch(userSlice.actions.usersFetchingError(e + ""));
  }
};

export const resetRemainingToLimit = (id: number, limit: number) => async (dispatch: AppDispatch) => {
  try {
    const responseGet = await axios.get<ICar>(`${BASE_URL}/${id}`);
    const car = responseGet.data;
    const updatedCar = { ...car, remaining: limit };

    const responsePut = await axios.put(`${BASE_URL}/${id}`, updatedCar);

    if (responsePut.status === 200) {
      dispatch(userSlice.actions.updateCar(updatedCar));
    }
  } catch (e) {
    console.error("Не удалось сбросить остаток до лимита", e);
  }
};

export const searchUsers = (searchTerm: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { user } = getState();
    const { users } = user;

    // Выполняем фильтрацию пользователей по номерам
    const filteredUsers = users.filter((user: ICar) => user.numbers.toLowerCase().includes(searchTerm.toLowerCase()));

    // Диспатчим экшн для обновления отфильтрованных пользователей
    dispatch(userSlice.actions.filterUsers(filteredUsers));
  } catch (error) {
    console.error("Не удалось найти пользователей:", error);
  }
};

export const updateArrestStatus = (id: number, newArrestStatus: string) => async (dispatch: AppDispatch) => {
  try {
    const responseGet = await axios.get<ICar>(`https://apisad.vercel.app/cars/${id}`);
    const car = responseGet.data;
    const updatedCar = { ...car, arrest: newArrestStatus };
    const responsePut = await axios.put(`https://apisad.vercel.app/cars/${id}`, updatedCar);

    if (responsePut.status === 200) {
      dispatch(userSlice.actions.toggleArrest({ id, newArrestStatus }));
    }
  } catch (e) {
    console.error("Не удалось обновить статус ареста.", e);
  }
};

export const updateRemaining = (id: number, newRemaining: number) => async (dispatch: AppDispatch) => {
  try {
    // Сначала получаем текущий объект
    const responseGet = await axios.get<ICar>(`https://apisad.vercel.app/cars/${id}`);
    const car = responseGet.data;

    // Обновляем объект
    const updatedCar = { ...car, remaining: newRemaining };

    // Затем отправляем обновленный объект обратно на сервер
    const responsePut = await axios.put(`https://apisad.vercel.app/cars/${id}`, updatedCar);

    if (responsePut.status === 200) {
      // Обновите состояние в Redux store
      dispatch(userSlice.actions.updateCar(updatedCar));
    }
  } catch (e) {
    console.error("Не удалось обновить остаток топлива", e);
  }
};

export const addUser = (newUser: ICar) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(BASE_URL, newUser);
    if (response.status === 201) {
      dispatch(userSlice.actions.addUser(response.data));
    }
  } catch (e) {
    console.error("Не удалось добавить пользователя", e);
  }
};

export const deleteUser = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(`https://apisad.vercel.app/cars/${id}`);
    if (response.status === 200) {
      dispatch(userSlice.actions.deleteUser(id));
    } else {
      console.error(`Ошибка при удалении пользователя: ${response.statusText}`);
    }
  } catch (e) {
    console.error("Не удалось удалить пользователя", e);
  }
};

export const updateUser = (updatedUser: ICar) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}/${updatedUser.id}`, updatedUser);
    if (response.status === 200) {
      dispatch(userSlice.actions.updateUser(response.data));
    } else {
      console.error(`Ошибка при обновлении пользователя: ${response.statusText}`);
    }
  } catch (e) {
    console.error("Не удалось обновить пользователя", e);
  }
};

export const toggleTicket = (id: number, ticket: "ticket1" | "ticket2") => async (dispatch: AppDispatch) => {
  try {
    const responseGet = await axios.get<ICar>(`${BASE_URL}/${id}`);
    const car = responseGet.data;
    console.log(`Current value of ${ticket} for car ${id}: ${car[ticket]}`);
    const updatedCar = {
      ...car,
      [ticket]: !car[ticket],
    };

    const responsePut = await axios.put(`${BASE_URL}/${id}`, updatedCar);

    if (responsePut.status === 200) {
      dispatch(userSlice.actions.toggleTicket({ id, ticket }));
      console.log(`Updated value of ${ticket} for car ${id}: ${updatedCar[ticket]}`);
    }
  } catch (e) {
    console.error("Не удалось обновить состояние путевки.", e);
  }
};

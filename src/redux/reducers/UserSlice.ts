import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICar } from "../model";

export interface UserState {
  users: ICar[];
  filteredUsers: ICar[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<ICar[]>) {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
      state.filteredUsers = action.payload.slice();
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    filterUsers(state, action: PayloadAction<ICar[]>) {
      state.filteredUsers = action.payload;
    },
    toggleArrest(
      state,
      action: PayloadAction<{ id: number; newArrestStatus: string }>
    ) {
      const { id, newArrestStatus } = action.payload;
      state.users = state.users.map((user) =>
        user.id === id ? { ...user, arrest: newArrestStatus } : user
      );
      state.filteredUsers = state.filteredUsers.map((user) =>
        user.id === id ? { ...user, arrest: newArrestStatus } : user
      );
    },
    updateCar(state, action: PayloadAction<ICar>) {
      const updatedCar = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedCar.id ? updatedCar : user
      );
      state.filteredUsers = state.filteredUsers.map((user) =>
        user.id === updatedCar.id ? updatedCar : user
      );
    },
    updateCars(state, action: PayloadAction<ICar[]>) {
      state.users = action.payload;
      state.filteredUsers = action.payload.slice();
    },
    addUser(state, action: PayloadAction<ICar>) {
      state.users.push(action.payload);
      state.filteredUsers.push(action.payload);
    },
    deleteUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
      state.filteredUsers = state.filteredUsers.filter(
        (user) => user.id !== userId
      );
    },
    updateUser(state, action: PayloadAction<ICar>) {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.filteredUsers = state.filteredUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    },

    toggleTicket(
      state,
      action: PayloadAction<{ id: number; ticket: "ticket1" | "ticket2" }>
    ) {
      const { id, ticket } = action.payload;
      state.users = state.users.map((user) =>
        user.id === id ? { ...user, [ticket]: !user[ticket] } : user
      );
      state.filteredUsers = state.filteredUsers.map((user) =>
        user.id === id ? { ...user, [ticket]: !user[ticket] } : user
      );
    },
  },
});

export const {
  usersFetching,
  usersFetchingSuccess,
  usersFetchingError,
  filterUsers,
  toggleArrest,
  updateCar,
  updateCars,
  addUser,
  deleteUser,
  updateUser,
  toggleTicket,
} = userSlice.actions;

export const selectFilteredUsers = (state: RootState) =>
  state.user.filteredUsers;

export default userSlice.reducer;

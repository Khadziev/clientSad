import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Navigate";
import { fetchUsers } from "./redux/reducers/ActionCreater";
import { useAppDispatch } from "./redux/redux";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;

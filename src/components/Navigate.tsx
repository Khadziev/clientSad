import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import Header from "./header/Header";
import AllCount from "./count/AllCount";
import LimitAll from "./limit/LimitAll";
import AllWrite from "./writeOffs/AllWrite";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LimitAll />} />
      <Route path="count" element={<AllCount />} />
      <Route path="write-offs" element={<AllWrite />} />
      <Route path="limit" element={<LimitAll />} />
    </Route>
  )
);

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export { router };

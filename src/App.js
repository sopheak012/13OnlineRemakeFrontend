import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { login } from "./features/user/user";
import { useDispatch } from "react-redux";
import { useCheckToken } from "./hooks/useCheckToken";

import Root from "./Routes/Root";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";

//check if the user is login via localStorage

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/mainPage" element={<MainPage />}></Route>
    </Route>
  )
);

function App() {
  useCheckToken();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

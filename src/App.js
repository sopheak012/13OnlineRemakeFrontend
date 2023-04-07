import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useCheckToken } from "./hooks/useCheckToken";

import Root from "./Routes/Root";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import JoinGame from "./pages/JoinGame";
import CreateGame from "./pages/CreateGame";
import SendMessage from "./socket/SendMessage";

//check if the user is login via localStorage

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/:username" element={<MainPage />}>
        <Route path="join" element={<JoinGame />} />
        <Route path="create" element={<CreateGame />} />
        <Route path="message" element={<SendMessage />} />
      </Route>
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

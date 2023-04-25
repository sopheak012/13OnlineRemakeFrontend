import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

//pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import JoinLobby from "../pages/JoinLobby";
import CreateLobby from "../pages/CreateLobby";
import Lobby from "../pages/Lobby";

//layouts
import Root from "../Routes/Root";
import MainPage from "../pages/MainPage";

function Router() {
  const user = useSelector((state) => state.user.user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="user/:username" element={<MainPage />}>
          <Route path="join" element={<JoinLobby />} />
          <Route path="create" element={<CreateLobby />} />
          <Route path="lobby/:lobbyName" element={<Lobby />} />
        </Route>
      </Route>
    )
  );

  return router;
}

export default Router;

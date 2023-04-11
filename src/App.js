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
import JoinLobby from "./pages/JoinLobby";
import CreateLobby from "./pages/CreateLobby";
import Lobby from "./pages/Lobby";
import ChatMessage from "./socket/ChatMessage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/:username" element={<MainPage />}>
        <Route path="join" element={<JoinLobby />} />
        <Route path="create" element={<CreateLobby />} />
        <Route path="lobby/:lobbyName" element={<Lobby />} />
      </Route>
      <Route path="/message" element={<ChatMessage />}></Route>
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

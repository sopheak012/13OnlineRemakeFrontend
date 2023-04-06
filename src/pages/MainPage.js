import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../css/style.css";

function MainPage() {
  return (
    <div>
      <div>
        <h1>Welcome to 13Online!</h1>
        <div className="game-button">
          <Link to="create">Create Game</Link>
          <Link to="join">Join Game</Link>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;

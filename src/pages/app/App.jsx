import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const App = () => {
  return (
    <>
      <Sidebar />
      <div className="app__home">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default App;

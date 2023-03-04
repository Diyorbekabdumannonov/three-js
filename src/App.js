import React, { createContext, Suspense, useState } from "react";
import "./style.css";
import MainCanvas from "./MainCanvas";
import Sidebar from "./Sidebar";
import Loading from "./Loading";

export const AppContext = createContext()

function App() {
  const [defaultColor, setDefaultColor] = useState('#454b51')

  return (
    <Suspense fallback={null}>
      <AppContext.Provider value={{ defaultColor, setDefaultColor }}>
        <div className="canvas-container">
          <Sidebar />
          <Loading />
          <MainCanvas />
        </div >
      </AppContext.Provider>
    </Suspense >
  );
}

export default App;

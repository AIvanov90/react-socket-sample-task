import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Creating new socket");
const socketWrapper = { socket: new WebSocket("wss://ws.postman-echo.com/raw") };

socketWrapper.socket.addEventListener("error", (error) => {
  console.log(`Error ${error.toString()}`);
  socketWrapper.socket.close();
});

export const SocketContext = React.createContext(socketWrapper);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SocketContext.Provider value={socketWrapper}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>
);

import { useContext, useEffect, useState } from "react";
import "./App.css";
import { SocketContext } from "./main";

function App() {
  const [textUpper, setTextUpper] = useState("");
  const [textLower, setTextLower] = useState("");
  const [textInput, setTextInput] = useState("");

  const socketWrapper = useContext(SocketContext);

  useEffect(() => {
    const messageHandler = (event: { data: string }) => {
      event.data[0] === event.data[0].toUpperCase()
        ? setTextUpper(event.data)
        : setTextLower(event.data);
    };
    socketWrapper.socket?.addEventListener("message", messageHandler);
    return () => {
      socketWrapper.socket?.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <>
      <div className="monitor-fields">
        <div>
          Upper case messages <br />
          <textarea
            className="my-width"
            readOnly
            rows={4}
            value={textUpper}
          ></textarea>
        </div>
        <div>
          Lower case messages <br />
          <textarea
            className="my-width"
            readOnly
            rows={4}
            value={textLower}
          ></textarea>
        </div>
      </div>
      <div className="send-fields">
        <input
          type="text"
          className="my-input my-width"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        />

        <button
          className="my-button my-width"
          onClick={() => {
            socketWrapper.socket?.send(textInput);
            setTextInput("");
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}

export default App;

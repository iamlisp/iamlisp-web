import React from "react";
import styled from "styled-components";
import Editor, { EditorWrapper } from "./components/Editor";
import Console, { ConsoleWrapper } from "./components/console/Console";
import "./App.css";
import config from "./config";
import useWebSocket from "./utils/useWebSocket";

const Layout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  ${EditorWrapper} {
    width: 50%;
  }

  ${ConsoleWrapper} {
    width: 50%;
  }
`;

function App() {
  const [status, messageEmitter, sendMessage] = useWebSocket(
    config.EVAL_ENDPOINT
  );

  return (
    <Layout>
      <Editor onEval={sendMessage} />
      {status === "open" && (
        <Console onEval={sendMessage} messageEmitter={messageEmitter} />
      )}
    </Layout>
  );
}

export default App;

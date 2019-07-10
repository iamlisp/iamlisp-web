import React, { useState, useCallback, useEffect, createRef } from "react";
import styled from "styled-components";
import Log from "./Log";
import Prompt from "./Prompt";
import useLogEntries from "./hooks/useLogEntries";
import useMessageHandler from "./hooks/useMessageHandler";
import ConnectingMessage from "./ConnectingMessage";

export const ConsoleWrapper = styled.section`
  padding: 4px;
  overflow-y: auto;
  font-size: 12pt;
  background-color: #000000;
  color: #eeeeee;
  font-family: "Monaco", monospace;
  outline: none;
  white-space: pre;
`;

const Console = ({ connectionStatus, onEval, messageEmitter }) => {
  const endRef = createRef();

  const [input, setInput] = useState("");
  const logEntries = useLogEntries([]);

  useMessageHandler(messageEmitter, logEntries);

  const handleSubmit = useCallback(() => {
    if (connectionStatus === "open") {
      logEntries.addInput(input);
      setInput("");
      onEval(input);
    }
  }, [input, onEval, logEntries, connectionStatus]);

  useEffect(() => endRef.current.scrollIntoView(), [endRef]);

  return (
    <ConsoleWrapper>
      <Log logEntries={logEntries.entries} />
      {connectionStatus !== "open" && <ConnectingMessage />}
      <Prompt value={input} onChange={setInput} onSubmit={handleSubmit} />
      <div ref={endRef} />
    </ConsoleWrapper>
  );
};

export default Console;

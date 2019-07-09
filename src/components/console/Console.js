import React, { useState, useCallback, useEffect, createRef } from "react";
import styled from "styled-components";
import Log from "./Log";
import Prompt from "./Prompt";

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

const Console = ({ onEval, messageEmitter }) => {
  const endRef = createRef();

  const [input, setInput] = useState("");
  const [logEntries, setLogEntries] = useState([]);

  const handleSubmit = useCallback(() => {
    const newInputLogEntry = { content: input, type: "input" };
    setLogEntries(entries => [...entries, newInputLogEntry]);
    setInput("");
    onEval(input);
  }, [input, onEval]);

  useEffect(() => {
    const handleMessage = ({ data }) => {
      const parsedData = JSON.parse(data);
      if ("error" in parsedData) {
        const newErrorLogEntry = { content: parsedData.error, type: "error" };
        setLogEntries(entries => [...entries, newErrorLogEntry]);
      }
      if ("result" in parsedData) {
        const newOutputLogEntry = {
          content: parsedData.result,
          type: "output"
        };
        setLogEntries(entries => [...entries, newOutputLogEntry]);
      }
    };

    if (messageEmitter) {
      messageEmitter.on("message", handleMessage);
      return () => {
        messageEmitter.off("message", handleMessage);
      };
    }
  }, [messageEmitter]);

  useEffect(() => {
    endRef.current.scrollIntoView();
  }, [endRef]);

  return (
    <ConsoleWrapper>
      <Log logEntries={logEntries} />
      <Prompt value={input} onChange={setInput} onSubmit={handleSubmit} />
      <div ref={endRef} />
    </ConsoleWrapper>
  );
};

export default Console;

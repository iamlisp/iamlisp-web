import { useState } from "react";

export default function useLogEntries(initialState) {
  const [logEntries, setLogEntries] = useState(initialState);

  return {
    addError(error) {
      const newErrorLogEntry = { content: error, type: "error" };
      setLogEntries(entries => [...entries, newErrorLogEntry]);
    },
    addOutput(output) {
      const newOutputLogEntry = { content: output, type: "output" };
      setLogEntries(entries => [...entries, newOutputLogEntry]);
    },
    addInput(input) {
      const newInputLogEntry = { content: input, type: "input" };
      setLogEntries(entries => [...entries, newInputLogEntry]);
    },
    entries: logEntries
  };
}

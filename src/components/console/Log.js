import React from "react";
import styled from "styled-components";
import InputPrefix from "./InputPrefix";

const LogEntry = styled.div``;

const LogWrapper = styled.div`
  ${LogEntry}.input {
    color: #ffffff;
  }

  ${LogEntry}.output {
    color: #00ff00;
  }

  ${LogEntry}.error {
    color: #ff0000;
  }
`;

const Log = ({ logEntries }) => {
  return (
    <LogWrapper>
      {logEntries.map((entry, i) => (
        <LogEntry key={i} className={entry.type}>
          {entry.type === "input" && <InputPrefix />}
          {entry.content}
        </LogEntry>
      ))}
    </LogWrapper>
  );
};

export default Log;

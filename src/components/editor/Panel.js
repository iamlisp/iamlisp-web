import React from "react";
import styled from "styled-components";
import FlatButton from "../FlatButton";

const Panel = styled.div`
  padding: 4px;
  background-color: #263238;
  color: #eeeeee;
  font-family: sans-serif;
`;

const PanelWrapper = ({ onEvalClick }) => {
  return (
    <Panel>
      <FlatButton onClick={onEvalClick}>Run</FlatButton>
    </Panel>
  );
};

export default PanelWrapper;

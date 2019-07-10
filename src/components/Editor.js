import React, { useState, useCallback } from "react";
import CodeMirror from "react-codemirror";
import styled from "styled-components";
import PanelWrapper from "./editor/Panel";

require("codemirror/mode/commonlisp/commonlisp");

export const EditorWrapper = styled.section`
  font-family: "Monaco", monospace;
  display: flex;
  flex-direction: column;
`;

const options = {
  mode: "commonlisp",
  theme: "material"
};

const Editor = ({ onEval }) => {
  const [code, setCode] = useState();

  const handleEvalClick = useCallback(() => onEval(code), [code, onEval]);
  const handleChange = useCallback((code, event) => setCode(code), []);

  return (
    <EditorWrapper>
      <CodeMirror value={code} onChange={handleChange} options={options} />
      <PanelWrapper onEvalClick={handleEvalClick} />
    </EditorWrapper>
  );
};

export default Editor;

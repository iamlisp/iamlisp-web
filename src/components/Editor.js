import React, { useState } from "react";
import CodeMirror from "react-codemirror";
import styled from "styled-components";

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

const Editor = props => {
  const [code, setCode] = useState();
  return (
    <EditorWrapper>
      <CodeMirror value={code} onChange={setCode} options={options} />
    </EditorWrapper>
  );
};

export default Editor;

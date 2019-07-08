import React from "react";
import styled from "styled-components";
import Editor from "./components/Editor";
import "./App.css";

const Layout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Layout>
      <Editor />
    </Layout>
  );
}

export default App;

import React from "react";
import styled from "styled-components";

const ConnectingText = styled.div`
  color: #888888;
`;

const ConnectingMessage = () => {
  return <ConnectingText>(Re)connecting...</ConnectingText>;
};

export default ConnectingMessage;

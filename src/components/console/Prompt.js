import React, { useState, useCallback } from "react";
import styled from "styled-components";
import InputPrefix from "./InputPrefix";

const PromptWrapper = styled.div`
  .cursor {
    background-color: #eeeeee;
    color: #223344;
  }
`;

function sanitizeCharUnderCursor(char) {
  if (!char) {
    return " ";
  }
  return char.replace("\n", " \n");
}

const Prompt = ({ value, onChange, onSubmit }) => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputBeforeCursor = value.slice(0, cursorPosition);
  const inputAtCursor = value[cursorPosition];
  const inputAfterCursor = value.slice(cursorPosition + 1);

  const putAtCursor = useCallback(
    content => {
      const beforeCursor = value.slice(0, cursorPosition);
      const afterCursor = value.slice(cursorPosition);

      setCursorPosition(currentPosition => currentPosition + content.length);
      onChange(`${beforeCursor}${content}${afterCursor}`);
    },
    [cursorPosition, value, onChange]
  );

  const handleKeyDown = useCallback(
    event => {
      switch (event.key) {
        case "ArrowLeft":
          return setCursorPosition(currentPosition =>
            Math.max(0, currentPosition - 1)
          );

        case "ArrowRight":
          return setCursorPosition(currentPosition =>
            Math.min(value.length, currentPosition + 1)
          );

        case "End":
          return setCursorPosition(value.length);

        case "Home":
          return setCursorPosition(0);

        case "Backspace": {
          const beforeCursor = value.slice(0, cursorPosition);
          const afterCursor = value.slice(cursorPosition);

          setCursorPosition(currentPosition =>
            Math.max(0, currentPosition - 1)
          );
          onChange(`${beforeCursor.slice(0, -1)}${afterCursor}`);

          break;
        }

        case "Delete": {
          const beforeCursor = value.slice(0, cursorPosition);
          const afterCursor = value.slice(cursorPosition);

          onChange(`${beforeCursor}${afterCursor.slice(1)}`);

          break;
        }

        default:
      }
    },
    [cursorPosition, value, onChange]
  );

  const handleKeyPress = useCallback(
    event => {
      event.preventDefault();

      switch (event.key) {
        case "Enter":
          return event.shiftKey ? putAtCursor("\n") : onSubmit(value);

        default:
          return putAtCursor(event.key);
      }
    },
    [putAtCursor, onSubmit, value]
  );

  const handlePaste = useCallback(
    event => {
      event.preventDefault();
      const data = event.clipboardData.getData("Text");
      return putAtCursor(data);
    },
    [putAtCursor]
  );

  return (
    <PromptWrapper
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      onPaste={handlePaste}
    >
      <InputPrefix />
      <span>{inputBeforeCursor}</span>
      <span className="cursor">{sanitizeCharUnderCursor(inputAtCursor)}</span>
      <span>{inputAfterCursor}</span>
    </PromptWrapper>
  );
};

export default Prompt;

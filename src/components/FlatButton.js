import styled from "styled-components";

const FlatButton = styled.button`
  color: #fff;
  background-color: #6496c8;
  text-shadow: -1px 1px #417cb8;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #346392;
    text-shadow: -1px 1px #27496d;
  }

  &:active {
    background-color: #27496d;
    text-shadow: -1px 1px #193047;
  }
`;

export default FlatButton;

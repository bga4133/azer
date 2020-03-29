import React, { Component } from "react";
import styled from "styled-components";

const HeaderComponent = styled.header`
  background-color: #ffc107;
  width: 100%;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 25px;
`;

export default class Header extends Component {
  render() {
    return (
      <HeaderComponent>
        <h2>Hola</h2>
      </HeaderComponent>
    );
  }
}

import React, { Component } from "react";
import Pong from "./Pong";
import styled from "styled-components";

const Main = styled.main`
  height: 100vh;
  width: 100vw;
  background: black;
`;

class App extends Component {
  render() {
    return (
      <Main>
        <Pong />;
      </Main>
    );
  }
}

export default App;

import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  text-align: center;
  width: 50vw;
  height: 50vh;
  align-items: center;
  justify-content: space-around;
`;

const Player = styled.div`
  height: 150px;
  width: 10px;
  background-color: white;
`;

const move = keyframes`
  0% { transform: translate(0, 0) }
  50% { transform: translate(50vw, 0) }
  100% { transform: translate(0, 0) }
`;

const Ball = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: white;
  animation: ${move} 10s linear infinite;
`;

class Pong extends Component {
  render() {
    return (
      <Container>
        <Player />
        <Ball />
        <Player />
      </Container>
    );
  }
}

export default Pong;

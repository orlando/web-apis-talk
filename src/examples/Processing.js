import React, { Component } from "react";

class Miner extends Component {
  state = {
    mining: true
  };

  componentDidMount() {
    // requestIdleCallback(this.idleCallback);
  }

  idleCallback = deadline => {
    while (deadline.timeRemaining() > 0) {
      this.mine();
    }

    this.stop();

    requestIdleCallback(this.idleCallback);
  };

  mine = () => {
    console.log("mining");
    this.setState({
      mining: true
    });
  };

  stop = () => {
    this.setState({
      mining: false
    });
  };

  render() {
    return <p>Bitcoin Miner: {this.state.mining ? "Mining" : "Idle"}</p>;
  }
}

export default Miner;

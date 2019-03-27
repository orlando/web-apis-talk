import React, { Component } from "react";

const taskCount = 10000;
const tasks = (length => Array.from({ length: length }, (_, i) => 0 + i))(
  taskCount
);
const idleTimes = [];

class Processing extends Component {
  state = {
    progress: 0,
    mean: 0,
    running: false
  };

  componentWillUnmount() {
    cancelIdleCallback(this.callbackId);
  }

  queueTask() {
    this.callbackId = requestIdleCallback(this.idleCallback, { timeout: 25 });
  }

  start = () => {
    this.setState({ running: true }, () => {
      this.queueTask();
    });
  };

  stop = () => {
    cancelIdleCallback(this.callbackId);

    const mean =
      idleTimes.reduce((previous, current) => (current += previous)) /
      idleTimes.length;

    this.setState({
      running: false,
      mean
    });
  };

  idleCallback = deadline => {
    while (deadline.timeRemaining() > 20 && !deadline.didTimeout) {
      const idleTimeLeft = deadline.timeRemaining();

      console.log(`Idle time remaining: ${idleTimeLeft}`);
      idleTimes.push(idleTimeLeft);
      this.process();
    }

    this.report();

    if (tasks.length > 0) {
      this.queueTask();
    }
  };

  process = () => {
    tasks.shift();
  };

  report = () => {
    this.setState({ progress: Math.abs(tasks.length - taskCount) });
  };

  render() {
    return (
      <div className="container">
        <p>Total tasks: {taskCount}</p>
        <progress value={this.state.progress} max={taskCount} />
        <button onClick={this.start} disabled={this.state.running}>
          Start
        </button>
        <button onClick={this.stop} disabled={!this.state.running}>
          Stop
        </button>
        <p>{`Idle time mean: ${this.state.mean}`}</p>
      </div>
    );
  }
}

export default Processing;

import React, { Component } from "react";
import "./Intersection.scss";

const threshold = step =>
  Array.from({ length: 1 / step + 1 }, (_, i) => 0 + i * step);

class Intersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 100
    };
    this.box = React.createRef();
  }

  componentDidMount() {
    // observer options
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: threshold(1 / 100)
    };

    // set observer
    this.observer = new IntersectionObserver(this.observeCallback, options);
    this.observer.observe(this.box.current);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  observeCallback = entries => {
    entries.forEach(entry => {
      this.setState({
        percentage: (entry.intersectionRatio * 100).toFixed(2)
      });
    });
  };

  render() {
    return (
      <div className="intersection">
        <div className="box" ref={this.box}>
          {this.state.percentage}%
        </div>
      </div>
    );
  }
}

export default Intersection;

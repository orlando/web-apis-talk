import React, { Component } from "react";
import "./Gallery.scss";

const images = [
  "https://images.unsplash.com/photo-1553257000-06f62adc2368?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1553349450-651a0379f1c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80",
  "https://images.unsplash.com/photo-1553259055-b2175537e16a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553288856-8b0781fcb208?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1363&q=80",
  "https://images.unsplash.com/photo-1553289434-bb3e5fb695ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553325657-57b3ced42e4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553341244-a1e4dd0bafcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1553537093-d3d970825195?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1553537191-71bdb6f96098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553338962-f84e87ff9b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1553513657-2c77762a187c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1553345081-1945a38e50c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
];

class Gallery extends Component {
  render() {
    return (
      <div className="gallery">
        {images.map((url, index) => {
          return <Image url={url} key={index} />;
        })}
      </div>
    );
  }
}

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.img = React.createRef();
  }

  componentDidMount() {
    // set observer
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };

    this.observer = new IntersectionObserver(this.observeCallback, options);
    this.observer.observe(this.img.current);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  observeCallback = entries => {
    entries.forEach(entry => {
      this.setState({
        visible: entry.isIntersecting
      });
    });
  };

  render() {
    const visibleClass = this.state.visible ? "" : "hidden";

    return (
      <img
        className={`image ${visibleClass}`}
        src={this.props.url}
        alt="myimage"
        ref={this.img}
      />
    );
  }
}

export default Gallery;

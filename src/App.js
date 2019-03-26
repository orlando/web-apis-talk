import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import IntersectionObserver from "./pages/IntersectionObserver";
import IntersectionObserver2 from "./pages/IntersectionObserver2";
import RequestIdleCallback from "./pages/RequestIdleCallback";
import PaymentRequest from "./pages/PaymentRequest";
import WebBluetooth from "./pages/WebBluetooth";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/intersection-observer/">
                  Intersection Observer API
                </Link>
              </li>
              <li>
                <Link to="/intersection-observer-2/">
                  Intersection Observer API 2
                </Link>
              </li>
              <li>
                <Link to="/request-idle/">requestIdleCallback</Link>
              </li>
              <li>
                <Link to="/payment-request/">Payment Request API</Link>
              </li>
              <li>
                <Link to="/bluetooth/">Web Bluetooth API</Link>
              </li>
            </ul>
          </nav>

          <Route
            path="/intersection-observer/"
            component={IntersectionObserver}
          />
          <Route
            path="/intersection-observer-2/"
            component={IntersectionObserver2}
          />
          <Route path="/request-idle/" component={RequestIdleCallback} />
          <Route path="/payment-request/" component={PaymentRequest} />
          <Route path="/bluetooth/" component={WebBluetooth} />
        </div>
      </Router>
    );
  }
}

export default App;

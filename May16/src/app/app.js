import React, { Component } from "react";
import Success from "./components/Success";
import UserSignIn from "./components/UserSignIn";

import "./app.css";
import ClassLifecycle from "./components/ClassLifecycle";

export class App extends Component {
  constructor(props) {
    console.log("App: constructor called");
    super(props);

    // initialize some state
    this.state = {
      mount: true,
    };

    this.mountCounter = () => this.setState({ mount: true });
    this.unmountCounter = () => this.setState({ mount: false });
  }

  render() {
    return (
      <div>
        <div>
          <h3>2. how react renders dom in conservative manner - explain</h3>
          <p className="ans">
            React renders the DOM conservatively with the use of a Virtual DOM.
            Components are rendered when needed and when state changes on that
            component. It batches changes and take advantage of a DIFF
            alogorithm and detemines which component has new states and renders
            those components appropriately.
          </p>

          <h3>7. explain how virtual dom works </h3>
          <p className="ans">
            The virtual DOM is a copy of the actual DOM developers have access
            to and work with. The virtual DOM is what's modified by the
            devlopers and comparied against the actual DOM to determine what
            changes where made which will cause the component to be re-reneder.
          </p>
        </div>

        <Success />
        <UserSignIn />
        {/*  when a component is removed from or taken out of the DOM
             componentWillUnmount is called */}
        <button
          className="mount"
          onClick={this.mountCounter}
          disabled={this.state.mount}
        >
          Mount Counter
        </button>
        <button
          className="mount"
          onClick={this.unmountCounter}
          disabled={!this.state.mount}
        >
          UnMount Counter
        </button>

        {this.state.mount ? <ClassLifecycle /> : null}
      </div>
    );
  }
}

export default App;

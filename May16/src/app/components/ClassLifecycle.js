import React, { Component } from 'react';

//9. Create a class component and show all the life cycle hooks/methods
export class ClassLifecycle extends Component {
  constructor(props) {
    console.log('ClassLifecycle: constructor called');
    super(props);

    // initialize some state
    this.state = {
      counter: 0,
      mount: true,
    };

    this.inc = () => this.setState({ counter: this.state.counter + 1 });
    this.dec = () => this.setState({ counter: this.state.counter - 1 });

    this.mountCounter = () => this.setState({ mount: true });
    this.unmountCounter = () => this.setState({ mount: false });
  }

  // called be all other after constructor
  static getDerivedStateFromProps(props, state) {
    console.log('ClassLifecycle: getDerivedStateFromProps called');
    console.log('props ', props);
    console.log('state ', state);

    // return state to be updated or nothing
    if (props.seed && state.seed !== props.seed) {
      return {
        counter: props.seed,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log('ClassLifecycle: componentDidMount called');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('ClassLifecycle: shouldComponentUpdate called');
    console.log('nextProps ', nextProps, 'nextState ', nextState);

    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('ClassLifecycle: getSnapshotBeforeUpdate called');
    console.log('prevProps ', prevProps, 'prevState ', prevState);

    return null;
  }

  render() {
    console.log('ClassLifecycle: render called');
    return (
      <div>
        <h5>Show Class Component Lifecycle Methods</h5>
        <button onClick={this.inc}>+</button>
        <button onClick={this.dec}>-</button>
        <div>Counter: {this.state.counter} </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('ClassLifecycle: componentDidUpdate called');
    console.log('prevProps ', prevProps, 'prevState ', prevState);
  }
  // call when a component is removed from or taken out of the DOM
  componentWillUnmount() {
    console.log('ClassLifecycle: componentWillUnmount called');
  }
}

export default ClassLifecycle;

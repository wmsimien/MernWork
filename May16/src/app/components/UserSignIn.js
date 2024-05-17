import React, { Component, createRef } from 'react';

//6. create UserSignIn component using uncontrolled way, should be class component

export class UserSignIn extends Component {
  constructor(props) {
    super(props);

    // create reference to specified format elements
    this.refName = React.createRef();
    this.refPswd = React.createRef();

    // initialize state
    this.state = {
      name: '',
      pswd: '',
    };
  }

  // functon to handle obtaining data from form
  handleSubmit = (e) => {
    // prevent normal behavior of form
    e.preventDefault();
    // get current reference value
    this.setState({ name: this.refName.current.value });
    this.setState({ pswd: this.refPswd.current.value });
  };
  render() {
    return (
      <div>
        <h2>User Sign-In</h2>
        {this.state.name && this.state.pswd && (
          <em>Hello {this.state.name}, you are now logged in.</em>
        )}
        {/* <h3>{this.state.pswd}</h3> */}
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={this.refName} placeholder="Enter username" />
          <br />
          <input
            type="password"
            ref={this.refPswd}
            placeholder="Enter password"
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserSignIn;

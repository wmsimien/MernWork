import React, { Component } from 'react';

export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // we need to read from store using props through container
      userName: props.user.userName,
      password: props.user.password,
      street: props.user.street,
      mobile: props.user.mobile,
    };
  }

  onTextChange = (evt) => {
    evt.preventDefault();

    let target = evt.target;
    //reading the class name of html when change event happens
    let classList = target.classList;
    let value = target.value;

    if (classList.contains('username')) {
      this.setState({ userName: value });
    } else if (classList.contains('pass')) {
      this.setState({ password: value });
    } else if (classList.contains('street')) {
      this.setState({ street: value });
    } else {
      this.setState({ mobile: value });
    }
  };

  // action creator
  loginUser = (evt) => {
    evt.preventDefault();

    let newUser = this.state;
    alert('Logged In -' + JSON.stringify(newUser));

    // upon user action to login we send user to store
    console.log('this.props ', this.props);
    // this.props.addUser(newUser);
    // will go to userContainer -> userAction -> server(db) -> store -> userReducer
    this.props.loginUser(newUser);
  };

  // controlled approach
  render() {
    return (
      <>
        <h1>User Login Page</h1>
        <section className={'componentClass'}>
          <div className="form col-md-8">
            <div className="col-md-12">
              <b>User Name</b>
              <input
                type="text"
                className="form-control col-md-6 username"
                value={this.state.userName}
                placeholder="User Name"
                onChange={this.onTextChange}
                maxLength={40}
              />
            </div>
            <div className="col-md-12">
              <b>Password</b>
              <input
                type="password"
                className="form-control col-md-6 pass"
                value={this.state.password}
                placeholder="Password"
                onChange={this.onTextChange}
                maxLength={40}
              />
            </div>
            <div className="col-md-12">
              <b>Street </b>
              <input
                type="text"
                className="form-control col-md-6 street"
                value={this.state.street}
                placeholder="Street Name"
                onChange={this.onTextChange}
              />
            </div>

            <div className="col-md-12">
              <b>Mobile </b>
              <input
                type="number"
                className="form-control col-md-6 mobile"
                value={this.state.mobile}
                placeholder="Mobile"
                maxLength="11"
                onChange={this.onTextChange}
              />
            </div>

            <input
              type="button"
              className={'btn btn-primary col-md-2 saveUser'}
              value={'SignIn-Up'}
              onClick={this.loginUser}
            />
          </div>
        </section>
      </>
    );
  }
}

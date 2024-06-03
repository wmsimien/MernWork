/**
 * create the connect method and add that to the component
 * this will be part of react-redux
 */
import { connect } from 'react-redux';
import { AddUserToStore, SaveUserToDB } from '../../../state/User/userAction';
import UserComponent from './UserComponent.jsx';

//mapstatetoprops -- allows component to become subscriber
let mapStateToProps = (store) => {
  console.log(store);
  //store is the redux states
  return {
    // usere will be accessed as props.user in component
    user: store.userReducer.user,
  };
};

//mapDispatchToProps -- allows us to send data back to store to update in reducer; for publishing
let mapDispatchToProps = (dispatch) => {
  // this makes it a publisher
  return {
    addUser: (user) => {
      dispatch(AddUserToStore(user));
    },
    loginUser: (user) => {
      dispatch(SaveUserToDB(user));
    },
  };
};
// This is the way before hooks
// connect(mapStateToProps) returns a new function and UserComponent will become its argument
// that new function will become a new component with the UserComponent prop
// connect accepts - mapStateToProps - for subscribing and
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);

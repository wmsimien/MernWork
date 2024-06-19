import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import Home from './Common/HomeComponent';
import Footer from './Common/FooterComponent';
import Header from './Common/HeaderComponent';
import About from './Common/AboutComponent';
import NotFound from './Common/NotFoundComponent';
import ProductListing from './Application/Product/ProductListing';
import ProductComponent from './Application/Product/ProductContainer';
import ProductDetails from './Application/Product/ProductDetails';
import CartComponent from './Application/Cart/CartComponent';
import CartDetails from './Application/Cart/CartDetails';
import Signup from './Application/User/Signup';
import UserLogin from './Application/User/UserLogin';
import EditProduct from './Application/Product/EditProduct';
import Checkout from './Application/Checkout/Checkout';
import RecentOrders from './Application/RecentOrders/RecentOrders';
import Reorder from './Application/Reorder/Reorder';
import Review from './Review/Review';
import UserLogout from './Application/User/UserLogout';
import { NoticeLayout } from './Application/Notification/NoticeLayout';

export default class ApplicationComponent extends Component {
  //props - is the set of properties html + js which needs to be available in every component
  // also a parent component can share data to child using props
  constructor(props) {
    super(props); //syncs the props values to parent/base class

    //define the state and initialize the state
    this.state = {
      //name: 'Simien',
      name: '',
    };
  }

  //the parameter will be accepted here when function executes in child component
  updateName = (value) => {
    //update state to create new virtual dom using setState - api
    this.setState({
      name: value,
    });
  };

  render() {
    return (
      // BrowserRouter
      <Router>
        <div className="topdiv">
          <Header userName={this.state.name} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  parentName1={this.state.name}
                  updateNameInParent={this.updateName}
                />
              }
            />
            <Route
              path="home"
              element={
                <Home
                  parentName1={this.state.name}
                  updateNameInParent={this.updateName}
                />
              }
            />
            <Route path="signup" element={<Signup />} />
            <Route path="userLogin" element={<UserLogin isLogin={true} />} />
            <Route path="userLogout" element={<UserLogout />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<ProductListing />} />
            <Route path="recentOrders" element={<RecentOrders />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="addProduct" element={<ProductComponent />} />
            <Route path="editProduct/:id" element={<EditProduct />} />
            <Route path="cart" element={<CartComponent />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="viewCart" element={<CartDetails />} />
            <Route path="reorder/:id" element={<Reorder />} />
            <Route path="review/:id" element={<Review />} />
            <Route path="notice" element={<NoticeLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}

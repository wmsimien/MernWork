import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddProductToStore = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_STORE,
    payload: product,
  };
};

export const DisplayAllProducts = (products) => {
  return {
    type: actionTypes.DISPLAY_ALL_PRODUCT,
    payload: products,
  };
};

export const SelectProduct = (product) => {
  return {
    type: actionTypes.SELECT_PRODUCT,
    payload: product,
  };
};

export const RemoveSelectedProduct = () => {
  return {
    type: actionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

// server calls
export const SaveProductToDB = (newProduct) => {
  return (dispatch) => {
    axios
      .post('http://localhost:9000/product/api/createProduct', newProduct)
      .then((productCollection) => {
        let productData = productCollection.data;
        dispatch(AddProductToStore(productData));
      })
      .catch((err) => {
        console.log('Error occurred while save new product.');
      });
  };
};

export const ShowAllProducts = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:9000/product/api/products')
      .then((productCollection) => {
        let productData = productCollection.data;
        dispatch(DisplayAllProducts(productData));
      })
      .catch((e) => {
        console.log('Error while fetching all products.', e);
      });
  };
};

export const ShowProduct = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/product/api/${id}`)
      .then((productCollection) => {
        let productData = productCollection.data;
        dispatch(SelectProduct(productData));
      })
      .catch((e) => {
        console.log('Error while fetching a product.', e);
      });
  };
};

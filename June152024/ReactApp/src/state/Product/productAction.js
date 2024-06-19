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
////////////////////////////////////////////////////////
export const getProducts = (data) => {
  return {
    type: actionTypes.GET_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const getProductsDetails = (data) => {
  return {
    type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
    payload: data,
  };
};

export const getProductsDetailsReset = () => {
  return {
    type: actionTypes.GET_PRODUCT_DETAILS_RESET,
  };
};
//////////////////////////////////////////////////////////////
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

export const SetProductQty = (product, itemQty) => {
  return {
    type: actionTypes.SET_PRODUCT_QTY,
    payload: product,
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

// based on loginUser info
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
///////////////////////////////////////////////////////////
export const GetAllProducts = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:9000/product/api/products')
      .then((productCollection) => {
        let productData = productCollection.data;
        dispatch(DisplayAllProducts(productData));
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_PRODUCT_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const GetAllProductsDetails = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/product/api/${id}`)
      .then((productCollection) => {
        let productData = productCollection.data;
        dispatch(getProductsDetails(productData));
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_PRODUCT_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const removeProduceDetails = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/product/api/${id}`)
      .then((productCollection) => {
        let productData = productCollection.data;
        console.log('productAction -> get product details: ', productData);
        dispatch(getProductsDetailsReset(productData));
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_PRODUCT_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};
//////////////////////////////////////////////////////////////////////////

export const ShowProduct = async (id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //server call
    return await axios.get(`http://localhost:9000/product/api/${id}`, config);
  } catch (error) {
    console.log(error.message);
  }
};

export const ShowProductToUpdate = async (id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //server call
    return await axios.get(`http://localhost:9000/product/api/${id}`, config);
  } catch (error) {
    console.log(error.message);
  }
};

export const RetrieveProduct = (product) => {
  console.log('RetrieveProduct ;', product);
  let name = product.name;
  let desc = product.desc;
  let findStr = name + ',' + desc;

  return (dispatch) => {
    axios
      .get(`http://localhost:9000/product/api/find/${findStr}`)
      .then((productCollection) => {
        let productData = productCollection.data;
        dispatch(DisplayAllProducts(productData));
      })
      .catch((e) => {
        console.log('Error while fetching a product.', e);
      });
  };
};

export const SelectProductAction = (product) => {
  return {
    type: actionTypes.SELECT_PRODUCT,
    payload: product,
  };
};

export const updateProductAction =
  (id, name, desc, price, image, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      //server call
      return await axios.put(
        `http://localhost:9000/product/api/${id}`,
        { name, desc, price, image, category },
        config
      );
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_FAIL,
        payload: error.message,
      });
    }
  };

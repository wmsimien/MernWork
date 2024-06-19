import { connect } from 'react-redux';
import {
  AddProductToStore,
  SaveProductToDB,
  RetrieveProduct,
} from '../../../state/Product/productAction';
import ProductComponent from './ProductComponent.jsx';

let mapStateToProps = (store) => {
  console.log('mapStateToProps ', store);
  return {
    product: store.productReducer.product,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => {
      dispatch(AddProductToStore(product));
    },
    saveProduct: (product) => {
      dispatch(SaveProductToDB(product));
    },
    getProduct: (product) => {
      console.log('product: ', product);
      dispatch(RetrieveProduct(product));
    },
    retrieveProduct: () => {
      console.log('set retrieved product: ');
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);

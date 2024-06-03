import { connect } from 'react-redux';
import {
  AddProductToStore,
  SaveProductToDB,
} from '../../../state/Product/productAction';
import ProductComponent from './ProductComponent.jsx';

let mapStateToProps = (store) => {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);

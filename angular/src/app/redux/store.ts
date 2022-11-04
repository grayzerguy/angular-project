import { combineReducers } from "redux";
import { productsReducer } from "./products.state";
import { legacy_createStore as createStore} from 'redux'
import { authReducer } from "./auth.state";
import { categoriesReducer } from "./categories.state";
import { ordersReducer } from "./orders.state";
import { cartsReducer } from "./cart.state";

// Creating reducers object from all our reducers :
const reducers = combineReducers({ //combineReducers is a function that combines all the reducers into one reducer object
  productsState: productsReducer,
  authState: authReducer,
  CategoriesState: categoriesReducer,
  OrdersState: ordersReducer,
  CartState: cartsReducer
});
// The most important Redux object :


const store = createStore(reducers); // store is a global object



export default store;


import { combineReducers } from "redux";
import loadingState from "./loadingState";
import shoppingCart from "./shoppingCart";

export default combineReducers({ loadingState, shoppingCart });

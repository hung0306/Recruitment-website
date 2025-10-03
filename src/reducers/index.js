import { combineReducers } from "redux";
import loginReducer from "./login";

const allReducers = combineReducers({
  loginReducer,

  // them nhieu reducer o day
});
export default allReducers;

// file gộp các reducer lại, . Sử dụng hàm combineReducer của redux để hợp nhất tất cả reducer thành 1 reducer là allReducers.

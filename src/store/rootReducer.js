import { combineReducers } from "redux";

const init_base_state = {};
const baseReducer = (state = init_base_state, action) => {
  switch (action.type) {
    case "UPDATE_BASE":
      return { ...state, ...action.update };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  base: baseReducer,
});

export default rootReducer;

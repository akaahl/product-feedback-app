import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataReducer from "./dataReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

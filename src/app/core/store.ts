"use client";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./saga";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const create = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = create();

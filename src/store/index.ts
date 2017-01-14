import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { State } from "../reducers";

export default function configureStore(history: HistoryModule.History & HistoryModule.HistoryQueries, rootReducer: Redux.Reducer<State>): Redux.Store<State> {

    // Create the history middleware which is needed for routing
    const historyMiddleware = routerMiddleware(history);
    // We now create the store, connecting it with thunk middleware and the history middleware we just built
    const createStoreWithMiddleware = applyMiddleware(thunk, historyMiddleware)(createStore);
    // Create and return the store
    return createStoreWithMiddleware(rootReducer);

}
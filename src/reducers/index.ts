import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { race, RaceState } from "./race";
import { user, UserState } from "./user";

export type State = {
    routing: any
    race: RaceState;
    user: UserState;
};

const appReducer = combineReducers<State>({
  routing: routerReducer,
  race,
  user
});

// Intercept global actions, such as logout to reset the state.
// From http://stackoverflow.com/a/35641992/1349766
const rootReducer = function (state: State, action: Redux.Action) {
  // and pass it on to the high level reducers
  return appReducer(state, action);
};

export default rootReducer;

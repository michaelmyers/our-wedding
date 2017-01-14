import * as Firebase from "firebase";
import { createHistory } from "history";
import "isomorphic-fetch";
import * as ReactDOM from "react-dom";
import * as ReactGA from "react-ga";
import { Provider } from "react-redux";
import { IndexRoute, Route, Router, useRouterHistory } from "react-router";
import { replace, syncHistoryWithStore } from "react-router-redux";

import Site from "./frames/Site";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RaceRegistrationPage from "./pages/RaceRegistrationPage";
import RSVPPage from "./pages/RSVPPage";
import rootReducer from "./reducers";
import configureStore from "./store";
import { getParameterValue } from "./utils";

import { setEmail, setUser } from "./actions";

console.log("v" + VERSION + "-" + BUILD_NUMBER);

// Initialize Google Analytics
ReactGA.initialize(GOOGLE_ANALYTICS);

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
// Help with this from https://github.com/ReactTraining/react-router/issues/353#issuecomment-181786502
// And http://stackoverflow.com/a/38123375/1349766
const browserHistory = useRouterHistory(createHistory)({
    basename: BASENAME
});
// Configure the store
const store = configureStore(browserHistory, rootReducer);
// And our history
const history = syncHistoryWithStore(browserHistory, store);

// For timing the firebase initialize
let firebaseInitializeTimer = new Date();
// Bootstrap Firebase
Firebase.initializeApp(FIREBASE_CONFIG);
// Register a callback for when a user is available
Firebase.auth().onAuthStateChanged(function (user: Firebase.User) {
    let firebaseInitializeTime = +new Date() - +firebaseInitializeTimer;
    console.log("Firebase took " + firebaseInitializeTime + "ms to initialize");

    if (!user) {
        Firebase.auth().signInAnonymously();
    } else {
        store.dispatch(setUser(user));
    }

    let email = getParameterValue("email");
    if (email && user) {
        store.dispatch(setEmail(email));
    }

    if (getParameterValue("reset")) {
        console.info("Resetting...");
        if (user) {
            user.delete();
        }
        store.dispatch(replace("/"));
    }
});

let onUpdate = function () {
    ReactGA.pageview(window.location.pathname);
};

let render = function () {
    ReactDOM.render((
        <Provider store={store}>
            <Router history={history} onUpdate={onUpdate}>
                <Route path="/" component={Site}>
                    <IndexRoute component={HomePage} />
                    <Route path="/rsvp" component={RSVPPage} />
                    <Route path="/race" component={RaceRegistrationPage} />
                    <Route path="*" component={NotFoundPage} />
                </Route>
            </Router>
        </Provider>
    ),
        document.getElementById("app")
    );
};

// And render...
render();
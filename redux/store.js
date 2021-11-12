import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { moviesReducer } from "./reducers/movies";
import ReduxThunk from "redux-thunk";
import { favoritesReducer } from "./reducers/favorites";

const allReducers = combineReducers({
	movies: moviesReducer,
	favorites: favoritesReducer,
});

const store = createStore(
	allReducers,
	compose(
		applyMiddleware(ReduxThunk),
		window.devToolsExtension ? window.devToolsExtension() : (f) => f
	)
);

export default store;

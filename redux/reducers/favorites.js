import { ADD_FAVORITE } from "../actions/favorites";

const initialState = {
	favorites: [],
};

export const favoritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FAVORITE:
			return {
				...state,
				favorites: [...state.favorites, action.movie],
			};
		default:
			return state;
	}
};

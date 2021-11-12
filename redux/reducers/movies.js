import { SET_MOVIES } from "../actions/movies";

const initialState = {
	discover: [],
	trending: [],
	tv: [],
};
export const moviesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_MOVIES:
			return {
				discover: action.discover,
				trending: action.trending,
				tv: action.tv,
			};
		default:
			return state;
	}
};

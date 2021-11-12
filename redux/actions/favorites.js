export const ADD_FAVORITE = "ADD_FAVORITE";

export const addFavorite = (movie) => {
	return { type: ADD_FAVORITE, movie: movie };
};

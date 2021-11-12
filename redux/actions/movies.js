export const SET_MOVIES = "SET_MOVIES";

export const fetchMovies = () => {
	return async (dispatch) => {
		const trending = await fetch(
			"https://api.themoviedb.org/3/trending/all/day?api_key=e2fc691cbebb6517735e8d1d42589ff6"
		);
		const discover = await fetch(
			"https://api.themoviedb.org/3/discover/movie?api_key=e2fc691cbebb6517735e8d1d42589ff6"
		);
		const tv = await fetch(
			"https://api.themoviedb.org/3/discover/tv?api_key=e2fc691cbebb6517735e8d1d42589ff6"
		);
		const trendingData = await trending.json();
		const discoverData = await discover.json();
		const tvData = await tv.json();

		dispatch({
			type: SET_MOVIES,
			discover: discoverData.results,
			trending: trendingData.results,
			tv: tvData.results,
		});
	};
};

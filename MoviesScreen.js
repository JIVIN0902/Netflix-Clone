import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/actions/movies";

const MoviesScreen = (props) => {
	const trending = useSelector((state) => state.movies.trending);
	const discover = useSelector((state) => state.movies.discover);
	const tv = useSelector((state) => state.movies.tv);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const Movie = React.memo(({ itemData }) => {
		const baseUrl = "https://image.tmdb.org/t/p/w500";

		return (
			<View>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() =>
						props.navigation.navigate("Details", {
							movie: itemData.item,
						})
					}
				>
					<Image
						resizeMethod="resize"
						resizeMode="contain"
						style={styles.image}
						source={{
							uri: baseUrl + itemData.item.poster_path,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	});

	useEffect(() => {
		setIsLoading(true);
		dispatch(fetchMovies());
		setIsLoading(false);
	}, [dispatch]);

	if (isLoading || trending.length == 0) {
		return <ActivityIndicator size="large" color="white" />;
	}

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>TRENDING</Text>
			<FlatList
				style={styles.movies}
				horizontal
				data={trending}
				keyExtractor={() => Math.random().toString()}
				renderItem={(itemData) => <Movie itemData={itemData} />}
			/>

			<Text style={styles.title}>DISCOVER</Text>
			<FlatList
				horizontal
				data={discover}
				keyExtractor={() => Math.random().toString()}
				renderItem={(itemData) => <Movie itemData={itemData} />}
			/>

			<Text style={styles.title}>TV SHOWS</Text>
			<FlatList
				style={styles.movies}
				horizontal
				data={tv}
				keyExtractor={() => Math.random().toString()}
				renderItem={(itemData) => <Movie itemData={itemData} />}
			/>
		</View>
	);
};

export default MoviesScreen;

export const screenOptions = (navData) => {
	return {
		headerTitle: "MOVIES",
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: { backgroundColor: "#111", flex: 1 },
	image: {
		width: Dimensions.get("window").width / 3.5,
		height: Dimensions.get("window").height / 4.2,
		marginHorizontal: 15,
	},

	title: {
		color: "white",
		fontFamily: "roboto-bold",
		fontSize: 20,
		marginVertical: 2,
	},
});

import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	Platform,
	Alert,
	TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./HeaderButton";
import { useDispatch } from "react-redux";
import { addFavorite } from "./redux/actions/favorites";
import { useEffect } from "react";

const MovieDetailsScreen = (props) => {
	const movie = props.route.params?.movie;
	const dispatch = useDispatch();
	const addFav = () => {
		dispatch(addFavorite(movie));
	};
	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="FAV"
						iconName={Platform.OS === "android" ? "md-star" : "ios-star"}
						onPress={() => {
							addFav();
							Alert.alert("Added to your Favorites!!");
						}}
					/>
				</HeaderButtons>
			),
		});
	}, []);
	const baseUrl = "https://image.tmdb.org/t/p/w500";
	return (
		<View style={styles.screen}>
			<Image
				style={styles.image}
				resizeMode="contain"
				source={{ uri: baseUrl + (movie.backdrop_path || movie.poster_path) }}
			/>
			<Text style={styles.title}>{movie.title || movie.name}</Text>
			<Text style={styles.description}>{movie.overview}</Text>
			<View style={styles.stars}>
				<AntDesign name="star" size={24} color="yellow" />
				<Text style={styles.rating}>{movie.vote_average}</Text>
			</View>
		</View>
	);
};

export default MovieDetailsScreen;

export const screenOptions = (navData) => {
	const movie = navData.route.params.movie;
	return {
		headerTitle: movie.title || movie.name,
		headerLeft: () => (
			<TouchableOpacity
				style={{ marginHorizontal: 5 }}
				onPress={() => navData.navigation.goBack()}
			>
				<Ionicons name="arrow-back-sharp" size={30} color="white" />
			</TouchableOpacity>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "#111",
		color: "white",
		flex: 1,
	},
	title: {
		color: "white",
		fontFamily: "roboto-bold",
		fontSize: 22,
		margin: 4,
	},
	image: {
		width: "100%",
		height: "50%",
	},
	description: {
		color: "white",
		fontSize: 15,
		fontFamily: "roboto-medium",
		margin: 4,
	},
	stars: {
		flexDirection: "row-reverse",
		padding: 10,
		marginTop: 5,
		alignItems: "center",
	},
	rating: {
		fontSize: 18,
		color: "white",
		marginRight: 10,
		marginTop: 4,
	},
});

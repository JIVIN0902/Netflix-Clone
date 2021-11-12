import React from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
} from "react-native";
import { useSelector } from "react-redux";

const FavMovie = (props) => {
	const baseUrl = "https://image.tmdb.org/t/p/w500";
	const TC =
		Platform.OS === "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;
	return (
		<TC onPress={props.onVisit}>
			<View style={styles.favorite}>
				<Image
					resizeMode="contain"
					style={styles.image}
					source={{ uri: baseUrl + props.imageUrl }}
				/>
				<Text style={styles.text}>{props.title}</Text>
			</View>
		</TC>
	);
};

const FavoritesScreen = ({ navigation }) => {
	const favorites = useSelector((state) => state.favorites.favorites);
	return (
		<View style={styles.screen}>
			<FlatList
				data={favorites}
				keyExtractor={() => Math.random().toString()}
				renderItem={(itemData) => (
					<FavMovie
						onVisit={() =>
							navigation.navigate("Details", { movie: itemData.item })
						}
						imageUrl={itemData.item.backdrop_path}
						title={itemData.item.name || itemData.item.title}
					/>
				)}
			/>
		</View>
	);
};

export const screenOptions = (navData) => {
	return {};
};

export default FavoritesScreen;

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "#111",
		flex: 1,
		width: "100%",
	},
	image: {
		width: "100%",
		height: 200,
	},
	favorite: {
		margin: 10,
	},
	text: {
		color: "white",
		fontFamily: "roboto-bold",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 10,
	},
});

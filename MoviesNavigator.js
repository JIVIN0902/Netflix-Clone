import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	SafeAreaView,
	Button,
	View,
	Platform,
	TouchableOpacity,
	Text,
} from "react-native";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
	createDrawerNavigator,
	DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "./AuthScreen";
import FavoritesScreen, {
	screenOptions as FavoritesScreenOptions,
} from "./FavoritesScreen";
import { auth } from "./firebase";
import MovieDetailsScreen, {
	screenOptions as MovieDetailsScreenOptions,
} from "./MovieDetailsScreen";
import MoviesScreen, {
	screenOptions as MoviesScreenOptions,
} from "./MoviesScreen";

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: "#111",
		shadowColor: "transparent",
	},
	headerTitleStyle: {
		color: "white",
		fontWeight: "bold",
		fontFamily: "roboto-bold",
	},
	headerTintColor: "white",
};

const MoviesStackNavigator = createStackNavigator();
export const MoviesNavigator = () => {
	return (
		<MoviesStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<MoviesStackNavigator.Screen
				name="Movies"
				component={MoviesScreen}
				options={MoviesScreenOptions}
			/>
			<MoviesStackNavigator.Screen
				name="Details"
				component={MovieDetailsScreen}
				options={MovieDetailsScreenOptions}
			/>
		</MoviesStackNavigator.Navigator>
	);
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
		</AuthStackNavigator.Navigator>
	);
};

const FavStackNavigator = createStackNavigator();

export const FavNavigator = () => {
	return (
		<FavStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<FavStackNavigator.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={FavoritesScreenOptions}
			/>
			<FavStackNavigator.Screen
				name="Details"
				component={MovieDetailsScreen}
				options={MovieDetailsScreenOptions}
			/>
		</FavStackNavigator.Navigator>
	);
};

const MoviesFavBottomTabNavigator = createBottomTabNavigator();

export const MoviesFavTabNavigator = () => {
	return (
		<MoviesFavBottomTabNavigator.Navigator
			tabBarOptions={{
				activeTintColor: "orange",
				style: {
					borderTopWidth: 0,
					borderTopColor: "transparent",
				},
				tabStyle: {
					backgroundColor: "#111",
					padding: 10,
					height: 60,
				},
				labelStyle: {
					fontFamily: "roboto-medium",
					fontSize: 14,
				},
			}}
		>
			<MoviesFavBottomTabNavigator.Screen
				name="Movies"
				component={DrawerNavigator}
				options={{
					tabBarIcon: (tabInfo) => (
						<Ionicons name="ios-film-outline" size={24} color="white" />
					),
				}}
			/>
			<MoviesFavBottomTabNavigator.Screen
				name="Favorites"
				component={FavNavigator}
				options={{
					tabBarIcon: (tabInfo) => (
						<Ionicons name="ios-star" size={24} color="white" />
					),
				}}
			/>
		</MoviesFavBottomTabNavigator.Navigator>
	);
};

// const MoviesFavTabNavigator = createBottomTabNavigator(
// 	{
// 		Movies: {
// 			screen: MoviesNavigator,
// 			navigationOptions: {

// 			},
// 		},
// 		Favorites: {
// 			screen: favNavigator,
// 			navigationOptions: {
// 				tabBarIcon: (tabInfo) => (
// 					<Ionicons name="ios-star-outline" size={24} color="white" />
// 				),
// 			},
// 		},
// 	},
// 	{
// 		tabBarOptions: {

// 		},
// 	}
// );

// const MainNavigator = createSwitchNavigator(
// 	{
// 		Auth: AuthNavigator,
// 		Movies: MoviesFavTabNavigator,
// 	},
// 	{
// 		navigationOptions: {
// 			drawerLabel: "Movies",
// 			color: "white",
// 		},
// 	}
// );

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			drawerStyle={{ backgroundColor: "#111" }}
			drawerType="front"
			drawerContentOptions={{
				activeTintColor: "orange",
				inactiveTintColor: "white",
				labelStyle: {
					fontFamily: "roboto-bold",
					fontSize: 15,
				},
				itemsContainerStyle: {
					marginTop: 40,
				},
			}}
			drawerContent={(props) => {
				return (
					<View style={{ flex: 1 }}>
						<SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
							<DrawerItemList {...props} />
							<View style={{ width: 90 }}>
								<TouchableOpacity
									onPress={() => {
										auth.signOut().then((user) => console.log(user));
									}}
								>
									<Text
										style={{
											color: "white",
											fontFamily: "roboto-bold",
											marginLeft: 5,
											fontSize: 15,
											padding: 10,
										}}
									>
										Logout
									</Text>
								</TouchableOpacity>
							</View>
						</SafeAreaView>
					</View>
				);
			}}
		>
			<Drawer.Screen name="Movies" component={MoviesNavigator} />
			{/* <Drawer.Screen name="Favorites" component={FavNavigator} /> */}
		</Drawer.Navigator>
	);
};

// export default createAppContainer(Drawer);

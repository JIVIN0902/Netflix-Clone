import { StatusBar } from "expo-status-bar";
import React from "react";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
	AuthNavigator,
	DrawerNavigator,
	MoviesFavTabNavigator,
	MoviesNavigator,
} from "./MoviesNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./firebase";
import { useEffect } from "react";

const fetchFonts = () => {
	return Font.loadAsync({
		"roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
		"roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);
	const [user, setUser] = useState();
	useEffect(() => {
		auth.onAuthStateChanged((newUser) => setUser(newUser));
	}, [auth]);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar style="light" />
				{!user ? <AuthNavigator /> : <MoviesFavTabNavigator />}
			</NavigationContainer>
		</Provider>
	);
}

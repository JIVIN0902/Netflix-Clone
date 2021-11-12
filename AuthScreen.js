import React, { useState } from "react";
import { useEffect } from "react";
import {
	Button,
	StyleSheet,
	TextInput,
	View,
	KeyboardAvoidingView,
	Alert,
	ActivityIndicator,
} from "react-native";
import { auth } from "./firebase";

const AuthScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const checkNotNull = () => {
		if (email == "" || password == "") {
			return false;
		}
		return true;
	};

	const Login = async () => {
		try {
			const check = checkNotNull();
			if (!check) {
				Alert.alert("Please fill in a valid email and password");
				return;
			}

			setIsLoading(true);
			const user = await auth.signInWithEmailAndPassword(email, password);
			if (!user.user) {
				Alert.alert("Invalid Email or Password");
				setIsLoading(false);
			}

			setIsLoading(false);
		} catch (error) {
			Alert.alert(error.message);
			setIsLoading(false);
		}
	};
	const SignUp = async () => {
		const check = checkNotNull();
		if (!check) {
			Alert.alert("Please fill in a valid email and password");
			return;
		}

		setIsLoading(true);
		auth.createUserWithEmailAndPassword(email, password);
		setIsLoading(false);
	};

	return (
		<KeyboardAvoidingView style={styles.screen}>
			<View style={styles.login}>
				<TextInput
					placeholder="Email"
					placeholderTextColor="white"
					autoCapitalize="none"
					style={styles.input}
					keyboardType="email-address"
					autoFocus={true}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					autoCapitalize="none"
					placeholder="Password"
					placeholderTextColor="white"
					style={styles.input}
					keyboardType="default"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>

				<View style={styles.button}>
					{isLoading ? (
						<ActivityIndicator color="white" />
					) : (
						<Button
							title={isSignUp ? "SIGN UP" : "LOGIN"}
							onPress={isSignUp ? SignUp : Login}
							color="#f70d1a"
						/>
					)}
				</View>
				<View style={styles.button}>
					<Button
						onPress={() => setIsSignUp((prevVal) => !prevVal)}
						title={isSignUp ? "LOGIN" : "Switch To SIGN UP"}
						color="#f70d1a"
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default AuthScreen;

AuthScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "AUTHENTICATION",
	};
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "#111",
		flex: 1,
		display: "flex",
		justifyContent: "center",
	},
	text: {
		color: "white",
	},
	input: {
		backgroundColor: "#111",
		color: "white",
		borderBottomColor: "white",
		width: "60%",
		fontSize: 20,
		borderBottomWidth: 1,
		padding: 8,
		alignSelf: "center",
		margin: 10,
	},
	login: {
		marginVertical: "auto",
	},
	button: {
		width: "50%",
		alignSelf: "center",
		margin: 10,
	},
});

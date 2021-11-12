import React from "react";
import { useRef } from "react";
import { NavigationActions } from "react-navigation";
import { auth } from "./firebase";
import MoviesNavigator from "./MoviesNavigator";

function NavContainer(props) {
	const navRef = useRef();
	auth.onAuthStateChanged((user) => {
		if (!user) {
			navRef.current.dispatch(
				NavigationActions.navigate({ routeName: "Auth" })
			);
		}
	});
	return <MoviesNavigator ref={navRef} />;
}

export default NavContainer;

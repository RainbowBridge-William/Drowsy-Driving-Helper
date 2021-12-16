import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";
import tw from "tailwind-react-native-classnames";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
    return (
      <Provider store={store}>
            <View style={styles.container}>
                <MainScreen />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        // height: "100%"
    },
});

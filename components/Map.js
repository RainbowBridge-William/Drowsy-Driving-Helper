import React from "react";
import tw from "twrnc";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";

MapboxGL.setAccessToken(
    "pk.eyJ1Ijoid2lsbGlhbXdhbmcwNjAyIiwiYSI6ImNrd3Jtc2wwODB3MDgyb3A0enp1ZWcycXYifQ.gLTdJRa1iYiQWVurp0WBQQ"
);

async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "This app needs access your location to work.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
        } else {
            console.log("Location permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}

function Map() {
    requestLocationPermission();
    return (
        <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
                <MapboxGL.UserLocation showsUserHeadingIndicator={true} />
            </MapboxGL.MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "85%",
        width: "100%",
    },
    map: {
        flex: 1,
    },
});
export default Map;

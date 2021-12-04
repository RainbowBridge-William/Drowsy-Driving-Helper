import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken(
    "pk.eyJ1Ijoid2lsbGlhbXdhbmcwNjAyIiwiYSI6ImNrd3Jtc2wwODB3MDgyb3A0enp1ZWcycXYifQ.gLTdJRa1iYiQWVurp0WBQQ"
);

const Map = () => {
    return (
        <View style={styles.container}>
            <MapboxGL.MapView style={styles.map} />
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        height: "85%",
        width: "100%",
    },
    map: {
        flex: 1,
    },
});
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { PermissionsAndroid } from 'react-native';

MapboxGL.setAccessToken(
    "pk.eyJ1Ijoid2lsbGlhbXdhbmcwNjAyIiwiYSI6ImNrd3Jtc2wwODB3MDgyb3A0enp1ZWcycXYifQ.gLTdJRa1iYiQWVurp0WBQQ"
);

const Map = () => {
    return (
        <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
                <MapboxGL.UserLocation showsUserHeadingIndicator={true}/>
            </MapboxGL.MapView>
        </View>
    );
};


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
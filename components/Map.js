import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken(
    "<pk.eyJ1Ijoid2lsbGlhbXdhbmcwNjAyIiwiYSI6ImNrd3FzcXNnbTBwbXQyb3M2dXdibnVkcnMifQ.tuNx-CDg66Wql0o88S7ayQ>"
);

const Map = () => {
    return (
        <View style={tw`h-85/100`}>
            <MapboxGL.MapView styleURL="mapbox://styles/williamwang0602/ckwrfnffc1qcu14mlqsdzy01i"/>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({});

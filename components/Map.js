import React, { FC, useState, useEffect } from "react";
import tw from "twrnc";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import Geolocation from "react-native-geolocation-service";

let userAlt, userLat;

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
            // if granted, store user's current location
            getLocation();
        } else {
            console.log("Location permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}

function getLocation() {
    Geolocation.getCurrentPosition(
        (position) => {
            userAlt = position.coords.altitude;
            userLat = position.coords.latitude;
            console.log(userAlt, userLat);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

function Map() {
    MapboxGL.locationManager.start();
    requestLocationPermission();
    return (
        <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
                <MapboxGL.Camera
                    followZoomLevel={12}
                    followUserLocation
                    followUserMode="compass"
                />

                <MapboxGL.UserLocation />
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

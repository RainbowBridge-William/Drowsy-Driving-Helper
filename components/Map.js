import React, { useRef, useState } from "react";
import tw from "twrnc";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import getNearestRestArea from "./getNearestRestArea";

const

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
            console.log(userLng);
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
            let userLng = position.coords.longitude;
            let userLat = position.coords.latitude;
            getNearestRestArea(userLng, userLat)
            .then((res) => {
                // console.log(res);
            })
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

function Map() {
    const cameraRef = useRef(undefined);
    // function resetCamera() {
    //     setTimeout(() => {
    //         console.log("change")
    //         // cameraRef.current.flyTo([userLng, userLat]);
    //         cameraRef.current.setCamera({
    //             zoomLevel: 12,
    //             followUserLocation: true,
    //             followUserMode: "course",
    //             onUserTrackingModeChange{resetCamera}
    //         });
    //     }, 3000);
    // }
    // MapboxGL.locationManager.start();
    requestLocationPermission();
    return (
        <View style={styles.container}>
            <MapboxGL.MapView
                style={styles.map}
                zoomEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}>
                <MapboxGL.Camera
                    ref={(r) => (cameraRef.current = r)}
                    followZoomLevel={15}
                    followUserLocation={true}
                    followUserMode="course"
                />

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

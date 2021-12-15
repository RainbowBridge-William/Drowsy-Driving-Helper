import React, { useRef, useState, useEffect } from "react";
import tw from "twrnc";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import getNearestRestArea from "./getNearestRestArea";
import { useDispatch, useSelector } from "react-redux";
import {
    selectDestination,
    selectOrigin,
    setDestination,
    setOrigin,
} from "../slices/navSlice";
import getGeoJSON from "./Route";

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
            console.log("Location permission granted");
        } else {
            console.log("Location permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}

export function getLocation() {
    const dispatch = useDispatch();
    Geolocation.getCurrentPosition(
        async (position) => {
            let userLng = position.coords.longitude;
            let userLat = position.coords.latitude;
            dispatch(setOrigin(position.coords));
            await getNearestRestArea(userLng, userLat).then((res) => {
                dispatch(setDestination(res));
            });
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

function Map(props) {
    const cameraRef = useRef(undefined);
    const rest = props.rest;
    const destination = useSelector(selectDestination);
    const start = useSelector(selectOrigin);
    const [geoJSON, setJSON] = useState();

    useEffect(() => {
        console.log("rerender map");
        if (rest == true && destination && start) {
            getGeoJSON(
                [start.longitude, start.latitude],
                [destination.lng, destination.lat]
            ).then((res) => setJSON(res));
        }
    }, [start, destination]);

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
                // zoomEnabled={false}
                // scrollEnabled={false}
                // pitchEnabled={false}
                // rotateEnabled={false}
                // compassEnabled={false}
            >
                <MapboxGL.Camera
                    ref={(r) => (cameraRef.current = r)}
                    followZoomLevel={15}
                    followUserLocation={true}
                    followUserMode="course"
                />
                {geoJSON && (
                    <>
                        <MapboxGL.PointAnnotation
                            id="nearestRestArea"
                            title={destination.name}
                            coordinate={[destination.lng, destination.lat]}
                        />
                        <MapboxGL.ShapeSource id="line1" shape={geoJSON}>
                            <MapboxGL.LineLayer
                                id="linelayer1"
                                style={{ lineColor: "red" }}
                            />
                        </MapboxGL.ShapeSource>
                    </>
                )}

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

import React, { useRef, useState, useEffect } from "react";
import tw from "twrnc";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    selectDestination,
    selectOrigin,
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

function Map(props) {
    const cameraRef = useRef(undefined);
    const rest = props.rest;
    const destination = useSelector(selectDestination);
    const start = useSelector(selectOrigin);
    const [geoJSON, setJSON] = useState();
    const routeStyle = {
        lineColor: "#3887be",
        lineWidth: 5,
        lineOpacity: 0.75,
        lineJoin: "round",
        lineCap: "round",
    };

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

    useEffect(requestLocationPermission, []);

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
                {geoJSON && props.rest && (
                    <>
                        <MapboxGL.PointAnnotation
                            id="nearestRestArea"
                            title={destination.name}
                            coordinate={[destination.lng, destination.lat]}
                        />
                        <MapboxGL.ShapeSource id="line1" shape={geoJSON}>
                            <MapboxGL.LineLayer
                                id="linelayer1"
                                style={routeStyle}
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

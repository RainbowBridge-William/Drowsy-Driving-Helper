import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import tw from "twrnc";
import Timer from '../components/Timer';
import Map, { getLocation } from '../components/Map';
import Geolocation from "react-native-geolocation-service";
import getNearestRestArea from "../components/getNearestRestArea";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setDestination, setOrigin } from "../slices/navSlice";

const MainScreen = () => {
    const [rest, setRest] = useState(false);
    const dispatch = useDispatch();
    return (
        <View style={tw `bg-white h-full w-full`}>
            <Timer></Timer>
            <Button title="track" onPress={ () => {
                setRest(true);
                console.log("data fetched")
                Geolocation.getCurrentPosition(
                    async (position) => {
                        let userLng = position.coords.longitude;
                        let userLat = position.coords.latitude;
                        dispatch(setOrigin(position.coords));
                        await getNearestRestArea(userLng, userLat)
                        .then((res) => {
                            dispatch(setDestination(res))
                        })
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            }
            } />
            <Map rest={rest}></Map>
            {/* <Button style={tw `h-4 w-4`} title="nav test" onPress={getLocation}></Button> */}
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({})

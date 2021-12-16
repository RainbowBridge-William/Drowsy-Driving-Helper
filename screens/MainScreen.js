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
    const [rest, setRest] = useState(false); // you should rest == false
    const dispatch = useDispatch();

    function handleTimesUP() {
        setRest(true);
        console.log("data fetched");
        Geolocation.getCurrentPosition(
            (position) => {
                let userLng = position.coords.longitude;
                let userLat = position.coords.latitude;
                dispatch(setOrigin(position.coords));
                getNearestRestArea(userLng, userLat).then((res) => {
                    dispatch(setDestination(res));
                });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    return (
        <View style={tw`bg-white h-full w-full`}>
            <Timer callBack={handleTimesUP} setRest={setRest} rest={rest}></Timer>
            <Map rest={rest}></Map>
            {/* <Button style={tw `h-4 w-4`} title="nav test" onPress={getLocation}></Button> */}
        </View>
    );
}

export default MainScreen

const styles = StyleSheet.create({})

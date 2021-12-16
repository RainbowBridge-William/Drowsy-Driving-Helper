import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import getNearestRestArea from "../components/getNearestRestArea";
import Geolocation from "react-native-geolocation-service";
import { setDestination, setOrigin } from "../slices/navSlice";

function Timer(props) {
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [hour, setHour] = useState("0");
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (counter < 3601) {
            setTimeout(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor((counter % 3600) / 60);
                const hourCounter = Math.floor(counter / 3600);
                setCounter(counter + 1);
                setSecond(
                    secondCounter < 10 ? `0${secondCounter}` : secondCounter
                );
                setMinute(
                    minuteCounter < 10 ? `0${minuteCounter}` : minuteCounter
                );
                setHour(hourCounter);
            }, 0.1); //just for demo, should be 1000
        } else {
            handleTimesUP();
        }
    });

    // set rest state to true, get user's current location/nearest rest area and store them to redux state
    function handleTimesUP() {
        props.setRest(true);
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

    function handleFinnishRest() {
        props.setRest(false);
        setSecond("00");
        setMinute("00");
        setHour("0");
        setCounter(0);
    }

    return (
        <View style={tw` flex justify-center items-center flex-1`}>
            <Text style={tw`text-3xl mt-2`}>You have drived</Text>
            <Text
                style={tw`text-2xl`}>{`${hour} h: ${minute} min: ${second} s`}</Text>
            {props.rest && (
                <Text>Please follow the route to nearest rest area</Text>
            )}
            {props.rest && (
                <Button
                    style={tw`w-full`}
                    title="Rested"
                    onPress={handleFinnishRest}
                />
            )}
        </View>
    );
}

export default Timer;

const styles = StyleSheet.create({});

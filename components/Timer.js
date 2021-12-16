import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

function Timer(props) {
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [hour, setHour] = useState("0");
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter < 7201) {
            setTimeout(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor((counter % 3600) / 60);
                const hourCounter = Math.floor(counter / 3600);
                setCounter(counter + 1);           
                setSecond(secondCounter < 10 ? `0${secondCounter}` : secondCounter);
                setMinute(minuteCounter < 10 ? `0${minuteCounter}` : minuteCounter);
                setHour(hourCounter);
            }, 0.1);
        } else {
            props.callBack();
        }
    })

    return (
        <View style={tw` flex justify-center items-center flex-1`}>
            <Text style={tw`text-3xl mt-2`}>You have drived</Text>
            <Text
                style={tw`text-3xl`}>{`${hour} h: ${minute} min: ${second} s`}</Text>
            <Text>{counter}</Text>
        </View>
    );
}

export default Timer;

const styles = StyleSheet.create({});

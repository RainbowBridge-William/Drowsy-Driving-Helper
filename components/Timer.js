import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import tw from "twrnc";

function Timer(props) {
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [hour, setHour] = useState("0");
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter < 3601) {
            setTimeout(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor((counter % 3600) / 60);
                const hourCounter = Math.floor(counter / 3600);
                setCounter(counter + 1);           
                setSecond(secondCounter < 10 ? `0${secondCounter}` : secondCounter);
                setMinute(minuteCounter < 10 ? `0${minuteCounter}` : minuteCounter);
                setHour(hourCounter);
            }, 0.1); //just for demo, should be 1000
        } else {
            props.callBack();
        }
    })

    function handleFinnishRest() {
        props.setRest(false);
        setSecond("00")
        setMinute("00")
        setHour("0")
        setCounter(0)
    }

    return (
        <View style={tw` flex justify-center items-center flex-1`}>
            <Text style={tw`text-3xl mt-2`}>You have drived</Text>
            <Text







                style={tw`text-2xl`}>{`${hour} h: ${minute} min: ${second} s`}</Text>
            {props.rest && <Text>Please follow the route to nearest rest area</Text>}
            {props.rest && <Button style={tw`w-full`} title="Rested" onPress={handleFinnishRest}/>}
        </View>
    );
}

export default Timer;

const styles = StyleSheet.create({});

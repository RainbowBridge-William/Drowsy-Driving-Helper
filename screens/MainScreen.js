import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import tw from "twrnc";
import Timer from '../components/Timer';
import Map, { getLocation } from '../components/Map';

const MainScreen = () => {
    const [rest, setRest] = useState(false); // you should rest == false

    return (
        <View style={tw`bg-white h-full w-full`}>
            <Timer style={tw`h-40/100`} setRest={setRest} rest={rest}></Timer>
            <Map style={tw`h-60/100`} rest={rest}></Map>
        </View>
    );
}

export default MainScreen

const styles = StyleSheet.create({})

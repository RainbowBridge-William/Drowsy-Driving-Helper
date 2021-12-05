import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import tw from "twrnc";
import Timer from '../components/Timer';
import Map, { getLocation } from '../components/Map';

const MainScreen = () => {
    return (
        <View style={tw `bg-white h-full w-full`}>
            
            <Timer></Timer>
            <Map></Map>
            {/* <Button style={tw `h-4 w-4`} title="nav test" onPress={getLocation}></Button> */}
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({})

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import tw from "twrnc";
import Timer from '../components/Timer';
import Map from '../components/Map';

const MainScreen = () => {
    return (
        <SafeAreaView style={tw `bg-white h-full w-full`}>
            <Timer></Timer>
        </SafeAreaView>
    )
}

export default MainScreen

const styles = StyleSheet.create({})

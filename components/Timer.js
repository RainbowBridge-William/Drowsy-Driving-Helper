import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

const Timer = () => {
    return (
        <View style={tw`bg-gray-200 flex justify-center items-center flex-1`}>
            <Text style={tw`text-3xl mt-2`}>You have drived</Text>
            <Text style={tw`text-3xl`}>1 h: 12 min: 30 s</Text>
        </View>
    );
};

export default Timer;

const styles = StyleSheet.create({

});


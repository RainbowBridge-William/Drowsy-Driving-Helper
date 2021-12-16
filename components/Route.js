import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

export default async function getGeoJSON(start, end) {
    const token =
        "pk.eyJ1Ijoid2lsbGlhbXdhbmcwNjAyIiwiYSI6ImNrd3Jtc2wwODB3MDgyb3A0enp1ZWcycXYifQ.gLTdJRa1iYiQWVurp0WBQQ";
    const URL = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${token}`;

    const query = await fetch(URL);

    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: route,
        },
    };

    return geojson;
}

const styles = StyleSheet.create({});

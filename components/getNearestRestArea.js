import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as turf from "@turf/turf";

async function getNearestRestArea(lng, lat) {
    const API_KEY = "AIzaSyAbGcU70AOVKPo68_U3LltUaVL0dJ95a1U";
    const GOOGLE_PLACES_URL =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const urlGas = `${GOOGLE_PLACES_URL}?location=${lat},${lng}&rankby=distance&type=gas_station&key=${API_KEY}`;
    const urlPark = `${GOOGLE_PLACES_URL}?location=${lat},${lng}&rankby=distance&type=parking&key=${API_KEY}`;
    const urls = [urlGas, urlPark];
    let data = [];

    let places = await fetchPlace(urlGas);
    let nearest = places.results[0];
    let nearestCleanData = {
        ...nearest.geometry.location,
        name: nearest.name,
    };
    data.push(nearestCleanData);
    places = await fetchPlace(urlPark);
    nearest = places.results[0];
    nearestCleanData = {
        ...nearest.geometry.location,
        name: nearest.name,
    };
    data.push(nearestCleanData);

    //calculate distance
    const dataWithDist = data.map((place) => {
        let to = turf.point([place.lng, place.lat]);
        let from = turf.point([lng, lat]);
        return { ...place, dist: turf.distance(from, to, { units: "miles" }) };
    });

    if (dataWithDist[0].dist > dataWithDist[1].dist) {
        return dataWithDist[1];
    } else {
        return dataWithDist[0];
    }
}

const fetchPlace = async (url) => {
    let placesRaw = await fetch(url);
    let places = await placesRaw.json();
    return places;
};

export default getNearestRestArea;

const styles = StyleSheet.create({});

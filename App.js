import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async function obterLocalizacao() {
      const { status } = await Permissions.askAsync(
        Permissions.LOCATION_FOREGROUND
      );

      if (status === "granted") {
        try {
          const location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
          });
          console.log(location);
          setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.00092,
            longitudeDelta: 0.0031,
          });
        } catch (error) {
          console.error("Erro ao obter a localização", error);
        }
      } else {
        console.log("Permissão de localização negada");
        // Lide com a recusa da permissão ou forneça uma alternativa aqui
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={origin}
          showsUserLocation={true}
          loadingEnabled={true}
          locale="pt-br"
        ></MapView>
      </View>
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "YOUR API KEY",
            language: "pt-br",
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    height: "90%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  search: {
    height: "70%",
    backgroundColor: "grey",
  },
});

import axios from "axios";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  ImageBackground,
  Image,
} from "react-native";
import  MapView,{Marker}  from "react-native-maps";

export default class ISSLocation extends React.Component {
 constructor() {
    super();
    this.state = {
      location: {},
    };
  }

  getISSLocation = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((responce) => {
        this.setState({
          location: responce.data,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  componentDidMount = () => {
    this.getISSLocation();
  };
  render() {
    if (Object.keys(this.state.location).length===0) {
      return(
        <Text>Loading.....</Text>
      )
    } else {
      
    
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require("../assets/iss_bg.jpg")}
          style={styles.backgroundImage}
        >
          <Text style={styles.titleText}>Iss live location</Text>
          <View style={styles.mapContainer}>
            <MapView
              region={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                longitudeDelta: 100,
                latitudeDelta: 100,
              }}
              style={styles.map}
            >
              <Marker
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                }}
              >
                <Image
                  source={require("../assets/iss_icon.png")}
                  style={{ height: 50, width: 50 }}
                ></Image>
              </Marker>
            </MapView>
          </View>
        </ImageBackground>
      </View>
    );
  }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: { flex: 1, resizeMode: "cover" },
  titleContainer: { flex: 0.1, justifyContent: "center", alignItems: "center" },
  titleText: { fontSize: 30, fontWeight: "bold", color: "white" },
  refeshContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: { flex: 0.6 },
  map: { width: "100%", height: "100%" },
});

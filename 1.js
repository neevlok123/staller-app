import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
  Image,
} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'

export default class Homescreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.androidSafeArea} />
          <ImageBackground
            source={require("../assets/bg_image.png")}
            style={styles.backgroundImage}
          >
            <View style={styles.titleBar}>
              <Text style={styles.titleText}>ISS Tracker App</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.routeCard}
                onPress={() => {
                  this.props.navigation.navigate("ISSscreen");
                }}
              >
                <Text>ISS location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.routeCard}
                onPress={() => {
                  this.props.navigation.navigate("Meteorscreen");
                }}
              >
                <Text>Meteors</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  androidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: { flex: 1, resizeMode: "cover" },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: "white",
  },
  titleBar: { flex: 0.15, justifyContent: "center", alignItems: "center" },
  titleText: { fontSize: 40, fontWeight: "bold", color: "white" },
  routeText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    marginTop: 75,
    paddingLeft: 30,
  },
  knowMore: { paddingLeft: 30, color: "red", fontSize: 15 },
  bgDigit: {
    position: "absolute",
    color: "rgba(183, 183, 183, 0.5)",
    fontSize: 150,
    right: 20,
    bottom: -15,
    zIndex: -1,
  },
  iconImage: {
    position: "absolute",
    height: 200,
    width: 200,
    resizeMode: "contain",
    right: 20,
    top: -80,
  },
});

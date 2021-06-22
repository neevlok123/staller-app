import React, { memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
  Image,
  FlatList
} from "react-native";
import axios from "axios";

export default class Meteorscreen extends React.Component {
  constructor() {
    super();
    this.state = {
      meteors: {}
    }
  }
  getMeteors = () => {
    axios
      .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=w61GVnXhdKg0GDhegYzzhUffxuDhGAx19OJJXa9l")
      .then((responce) => {
        this.setState({
          meteors: responce.data.near_earth_objects
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  keyExtractor = (item, index) => {
    index.toString()
  }

  renderItem = ({ item }) => {
    let meteor = item
    let bg_img, speed, Size
    if (meteor.threat_Score <= 30) {
      bg_img = require("../assets/meteor_bg1.png")
      speed = require("../assets/meteor_speed1.gif")
      Size = 100
    } else if (meteor.threat_Score <= 75) {
      bg_img = require("../assets/meteor_bg2.png")
      speed = require("../assets/meteor_speed2.gif")
      Size = 150
    } else {
      bg_img = require("../assets/meteor_bg3.png")
      speed = require("../assets/meteor_speed3.gif")
      Size = 200
    }
    return (
      <View>
        <ImageBackground source={bg_img} style={styles.backgroundImage}>
          <View style={styles.gifContainer}>
            <Image source={speed} style={{ width: Size, height: Size, alignSelf: "center" }}></Image>
          </View>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </ImageBackground>
      </View>
    )
  }

  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View>
          <Text>LOADING......</Text>
        </View>
      )
    } else {
      let meteor_arr = Object.keys(this.state.meteors).map((meteor_date) => {
        return (
          this.state.meteors[meteor_date]
        )
      })
      let meteors = [].concat.apply([], meteor_arr)
      meteors.forEach(element => {
        let diameater = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
        let threatScore = (diameater / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
        element.threat_Score = threatScore
      });
      meteors.sort((a, b) => {
        return b.threat_Score - a.threat_Score
      })
      meteors = meteors.slice(0, 5)
      return (
        <View>
          <SafeAreaView />
          <FlatList renderItem={this.renderItem} data={meteors} keyExtractor={this.keyExtractor} horizontal={true} />
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  backgroundImage: { flex: 1, resizeMode: 'cover', width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  titleBar: { flex: 0.15, justifyContent: "center", alignItems: "center" },
  titleText: { fontSize: 30, fontWeight: "bold", color: "white" },
  meteorContainer: { flex: 0.85 },
  listContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: "center", 
    marginLeft: 10, marginRight: 10, marginTop: 5, borderRadius: 10, padding: 10
  },
  cardTitle: { fontSize: 20, marginBottom: 10, fontWeight: "bold", color: "white" },
  cardText: { color: "white" },
  threatDetector: { height: 10, marginBottom: 10 },
  gifContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  meteorDataContainer: { justifyContent: "center", alignItems: "center", }
});

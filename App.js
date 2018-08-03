import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Container } from "native-base";
import RootNavigation from "./src/navigation/RootNavigation";
import firebase from "firebase";
import Login from "./src/components/Login";

const config = {
  apiKey: "AIzaSyBUBzaWNF6-x3io_7zYq6VVRknBlwPu02g",
  authDomain: "react-native-to-do-list.firebaseapp.com",
  databaseURL: "https://react-native-to-do-list.firebaseio.com",
  projectId: "react-native-to-do-list",
  storageBucket: "react-native-to-do-list.appspot.com"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  render() {
    return (
      <RootNavigation>
        <Login />
      </RootNavigation>
    );
  }
}

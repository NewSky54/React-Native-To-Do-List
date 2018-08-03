import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AppRegistry,
  ImageBackground
} from "react-native";
import { Button, Form, Item, Input, Label, Icon } from "native-base";
import * as firebase from "firebase";
const remote =
  "http://cdn.wonderfulengineering.com/wp-content/uploads/2014/10/wood-wallpaper-23.jpg ";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  signUpPage = () => {
    try {
      this.props.navigation.navigate("Signup");
    } catch (err) {
      console.log("Error in signUpUser", err);
    }f
  };

  loginUser = async (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            if (!user.object) this.props.navigation.navigate("Main");
          },
          error => {
            Alert.alert(error.message);
          }
        );
    } catch (err) {
      console.log("Error in loginUser", err);
    }
  };

  render() {
    return (
      <ImageBackground style={styles.flex} source={{ uri: remote }}>
        <Form style={styles.container}>
          <Item floatingLabel>
            <Icon style={styles.color} name="person" />
            <Label style={styles.color}>Email</Label>
            <Input
              style={{ color: "#fff" }}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Icon style={styles.color} name="lock" />
            <Label style={styles.color}>Password</Label>
            <Input
              style={{ color: "#fff" }}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>

          <Button
            style={{ marginTop: 20 }}
            full
            rounded
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Log in</Text>
          </Button>
          <View
            style={{
              paddingLeft: 75,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "grey", paddingRight: 10 }}>
              Don't have an account?
            </Text>

            <Button transparent onPress={this.signUpPage}>
              <Text style={styles.color}>Sign up</Text>
            </Button>
          </View>
        </Form>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  color: {
    color: "#fff"
  },
  flex: {
    flex: 1
  }
});

export default Login;

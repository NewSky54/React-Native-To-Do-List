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
const remote = "https://i.imgur.com/wNtUql0.png";

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
    }
  };

  loginUser = async (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            if (!user.object) this.props.navigation.navigate("Main");
            return this.setState({ email: "", password: "" });
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
    const { email, password } = this.state;
    return (
      <ImageBackground style={styles.flex} source={{ uri: remote }}>
        <Form style={styles.container}>
          <Item floatingLabel>
            <Icon style={styles.color} name="person" />
            <Label style={styles.color}>Email</Label>
            <Input
              value={email}
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
              value={password}
              style={{ color: "#fff" }}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>

          <Button
            style={{
              marginTop: 20,
              height: 50,
              width: "50%",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.3)"
            }}
            light
            bordered
            transparent={true}
            rounded
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Log in
            </Text>
          </Button>
          <View
            style={{
              paddingLeft: 75,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#D3D3D3", paddingRight: 10 }}>
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

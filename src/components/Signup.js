import React from "React";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { Button, Text, Form, Item, Input, Label, Icon } from "native-base";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
const remote = "https://i.imgur.com/wNtUql0.png";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: ""
  };

  signUpUser = () => {
    const { email, password, passwordConfirm } = this.state;
    try {
      if (password.length < 6) {
        Alert.alert("Password must be at least 6 characters");
        return;
      }
      if (password !== passwordConfirm) {
        Alert.alert("Passwords do not match");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            this.props.navigation.navigate("Main");
            return this.setState({ email: "", password: "", passwordConfirm: ""});
          },
          error => {
            Alert.alert(error.message);
          }
        );
    } catch (err) {
      console.log("Error in signUpUser", err);
    }
  };

  render() {
    const { email, password, passwordConfirm } = this.state;
    return (
      <ImageBackground style={styles.flex} source={{ uri: remote }}>
        <Form style={styles.container}>
          {/* Email Input Field */}
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
          {/* Password Input Field */}
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
          {/* Retype Password Input Field */}
          <Item floatingLabel>
            <Icon style={styles.color} name="lock" />
            <Label style={styles.color}>Retype Password</Label>
            <Input
              value={passwordConfirm}
              style={{ color: "#fff" }}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
            />
          </Item>
          {/* Submit Button */}
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
            rounded
            bordered
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Sign up</Text>
          </Button>
          <View
            style={{
              paddingLeft: 75,
              flexDirection: "row",
              alignItems: "center"
            }}
          />
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
    color: "#fff",
    fontSize: 18
  },
  flex: {
    flex: 1
  }
});

export default Signup;

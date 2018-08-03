import React from "React";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { Button, Text, Form, Item, Input, Label, Icon } from "native-base";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
const remote = "https://wallpapercave.com/wp/12Pyika.jpg";

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
    return (
      <ImageBackground style={styles.flex} source={{ uri: remote }}>
        <Form style={styles.container}>
          {/* Email Input Field */}
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
          {/* Password Input Field */}
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
          {/* Retype Password Input Field */}
          <Item floatingLabel>
            <Icon style={styles.color} name="lock" />
            <Label style={styles.color}>Retype Password</Label>
            <Input
              style={{ color: "#fff" }}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
            />
          </Item>
          {/* Submit Button */}
          <Button
            style={{ marginTop: 20 }}
            full
            rounded
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

import React, { Component } from "react";
import { View, StyleSheet, Alert, ListView, SafeAreaView } from "react-native";
import {
  CheckBox,
  ListItem,
  Content,
  Header,
  List,
  Input,
  Item,
  Button,
  Text,
  Icon,
  Title,
  Container
} from "native-base";
import * as firebase from "firebase";

const data = [];
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class Main extends Component {
  state = {
    listViewData: data,
    newContact: "",
    checked: false
  };

  componentDidMount() {
    // Adds each new task to db
    const tasks = firebase.database().ref("/tasks");
    tasks.on("child_added", data => {
      const newData = [...this.state.listViewData];
      newData.push(data);
      this.setState({ listViewData: newData });
    });
  }

  addRow = data => {
    const { newContact, checked } = this.state;
    // Getting the key to each task
    const key = firebase
      .database()
      .ref("/tasks")
      .push().key;
    // Adds the task to the db via the key
    firebase
      .database()
      .ref("/tasks")
      .child(key)
      .set({ name: data, checked: false });
    console.log(data)
  };

  deleteRow = async (secId, rowId, rowMap, data) => {
    // Deletes task in db
    await firebase
      .database()
      .ref(`tasks/${data.key}`)
      .set(null);

    // Remove task and setState to trigger rerender
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  };

  handleCheckBoxClick = async (data, secId, rowId, rowMap) => {
    // Not Completed
    const task = await firebase
      .database()
      .ref(`tasks/${data.key}`)
      .update({ checked: !this.state.checked });
  };

  onSignoutPress = () => {
    // Signout then redirects to Login
    firebase
      .auth()
      .signOut()
      .then(user => {
        this.props.navigation.navigate("Login");
        Alert.alert("You have successfully signed out");
      });
  };

  render() {
    const { newContact, listViewData, checked } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header>
          <Content>
            <Item>
              <Input
                onChangeText={newContact => this.setState({ newContact })}
                placeholder="Add name"
              />
              <Button onPress={() => this.addRow(newContact)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>
        <Content>
          <List
            enableEmptySections
            dataSource={ds.cloneWithRows(listViewData)}
            renderRow={(data, secId, rowId, rowMap) => (
              <ListItem style={{ paddingLeft: 10 }}>
                <CheckBox
                  checked={checked} // Not finished
                  onPress={() =>
                    this.handleCheckBoxClick(data, secId, rowId, rowMap)
                  }
                />
                <Text style={{ paddingLeft: 10 }}>{data.val().name}</Text>
              </ListItem>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={() => this.deleteRow(secId, rowId, rowMap, data)}
              >
                <Icon name="trash" />
              </Button>
            )}
            rightOpenValue={-75}
          />
        </Content>

        <Button full title="Signout" onPress={this.onSignoutPress}>
          <Text>Sign out</Text>
        </Button>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  signOut: {
    alignSelf: "flex-end"
  }
});
export default Main;

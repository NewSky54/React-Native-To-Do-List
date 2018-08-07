import React, { Component } from "react";
import { View, StyleSheet, Alert, ListView, SafeAreaView } from "react-native";
import Icons from "react-native-vector-icons/Entypo";
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
    todo: ""
  };

  componentDidMount() {
    // Adds each new task to db
    const tasks = firebase.database().ref("/tasks");
    tasks.on("value", data => {
      data = data.val();
      this.setState({ listViewData: Object.keys(data).map(key => data[key]) });
    });
  }

  addRow = () => {
    const { todo, checked } = this.state;
    if (!todo.length) {
      Alert.alert("Task cannot be empty");
      return;
    }
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
      .set({ name: todo, checked: false });
    // console.log(data);
    this.setState({ todo: "" });
  };

  deleteRow = async (secId, rowId, rowMap, data) => {
    // Deletes task in db
    const ref = firebase.database().ref(`tasks`);
    ref.once("value").then(snapshot => {
      const key = Object.keys(snapshot.val())[rowId];
      firebase
        .database()
        .ref(`tasks/${key}`)
        .set(null);
    });
    // Remove task and setState to trigger rerender
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  };

  handleCheckBoxClick = async (data, secId, rowId, rowMap) => {
    const { listViewData } = this.state;
    const numRowId = parseInt(rowId, 10);

    const ref = firebase.database().ref(`tasks`);
    ref.once("value").then(snapshot => {
      const key = Object.keys(snapshot.val())[rowId];
      firebase
        .database()
        .ref(`tasks/${key}`)
        .update({ checked: !listViewData[rowId].checked });
    });

    const updatedListViewData = listViewData.map(
      (d, idx) => (idx === numRowId ? { ...d, checked: !d.checked } : d)
    );

    this.setState({ listViewData: updatedListViewData });
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
    const { todo, listViewData, checked } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Item style={{ height: 60 }}>
          <Input
            value={todo}
            onChangeText={todo => this.setState({ todo })}
            placeholder="Add name"
          />
          <Button
            onPress={this.addRow}
            style={{
              width: 45,
              height: 45,
              justifyContent: "center",
              alignSelf: "center",
              marginHorizontal: 8
            }}
          >
            <Icons name="add-to-list" color="#fff" size={30} />
          </Button>
        </Item>
        <Content>
          <List
            dataSource={ds.cloneWithRows(listViewData)}
            renderRow={(data, secId, rowId, rowMap) => (
              <ListItem style={{ paddingLeft: 10 }}>
                <CheckBox
                  checked={listViewData[rowId].checked} // Not finished
                  onPress={() =>
                    this.handleCheckBoxClick(data, secId, rowId, rowMap)
                  }
                />
                <Text style={{ paddingLeft: 10 }}>{data.name}</Text>
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

import React from "react";
import { createStackNavigator } from "react-navigation";

import Login from "./../components/Login";
import Signup from "./../components/Signup";
import Main from "./../components/Main";

export default createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Main: { screen: Main },
});

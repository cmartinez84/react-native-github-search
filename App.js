/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  Text,
  TabBar,
  View
} from 'react-native';
import Login from './Login.js';
import AppContainer from './AppContainer.js';

var AuthService = require('./AuthService');


const instructions = Platform.select({
  ios: 'Pressmmmmmmmm Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentDidMount(){
    AuthService.getAuthInfo((err, authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
    });
  }
  ///sss
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true,
    }
  }
  onLogin=()=>{
    this.setState({isLoggedIn: true})
  }
  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}
            />
        </View>
      )
    }
    if(this.state.isLoggedIn){
      return (
          <AppContainer/>
      )
    }
    if(!this.state.isLoggedIn){
      return (
        <View style={styles.container}>
            <Login onLogin={this.onLogin}/>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

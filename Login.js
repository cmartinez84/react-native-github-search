/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  View
} from 'react-native';

const buffer =require('buffer');
type Props = {};
export default class Login extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      showProgress: false,
      success: false
    }

  }

  onLoginPressed=()=>{
    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results)=>{
      this.setState(results);
      this.setState({showProgress: false});
      console.log(results);
      if(results.success){
        this.props.onLogin();
        console.log("success");
      }
    });

    this.setState({showProgress: true});
  }
  render() {
    var errorCtrl =<View/>


    const octocat = require('./img/Octocat.png');
    return (
        <View style={styles.container}>
        <Image style={styles.logo}
          source={octocat}/>
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Github Useranem"
          onChangeText={(text)=>{this.setState({username: text})}}
          nativeId="username"
          />
        <TextInput style={styles.input}
          placeholder="Github Useranem"
          secureTextEntry={true}
          onChangeText={(text)=>{this.setState({password: text})}}
          nativeId="password"
          />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPressed.bind(this)}>
            <Text style={styles.buttonText}>sss</Text>
        </TouchableHighlight>
        {errorCtrl}
        <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            style={styles.loader}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#333',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo:{
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBCE',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader:{
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10,
  }
})

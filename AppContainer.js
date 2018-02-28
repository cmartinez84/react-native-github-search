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
  TabBarIOS,
  View
} from 'react-native';

import Feed from './Feed.js';

const buffer =require('buffer');
type Props = {};

export default class AppContainer extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'feed'
    }
  }

  render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab == 'feed'}
          icon={require('./img/inbox.png')}
          onPress={()=>this.setState({selectedTab: 'feed'})}
          >
          <Feed></Feed>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          icon={require('./img/search.png')}
          onPress={()=>this.setState({selectedTab: 'search'})}
          >
          <Text style={styles.welcome}>Tab 2</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
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

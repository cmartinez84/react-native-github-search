/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  Image
} from 'react-native';
import moment from 'moment';
import AuthService from './AuthService';
// const buffer =require('buffer');
type Props = {};

export default class PushPayload extends Component<Props> {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged:(r1, r2) => r1 != r2
    })
    this.state = {
      dataSource:  ds.cloneWithRows(props.pushEvent.payload.commits),
      pushEvent: props.pushEvent
    }
  }
  renderRow=(rowData)=>{
    console.log("RIONONOININ");
    return(
      <View style={{
          flex: 1,
          justifyContent: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          // borderTopWidth: 1,
          paddingTop: 20,
          paddingBottom: 20,
          padding: 10
        }}>
        <Text>
          <Text style={styles.bold}>
            {rowData.sha.substring(0,6)}
          </Text> - {rowData.message}</Text>
      </View>
    )
  }


  render(){
    return (
      <View style={styles.payloadContainer}>
        <Image
          source={{url: this.state.pushEvent.actor.avatar_url}}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60 }}>
        </Image>
        <Text style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize:20}}>{moment(this.state.pushEvent.created_at).fromNow()}</Text>
            <Text>
              <Text style={styles.bold}>
                {this.state.pushEvent.actor.login}
              </Text>
              Pushed to
            </Text>
            <Text>
              <Text style={styles.bold}>
                {this.state.pushEvent.payload.ref.replace('refs/heads/', '')}
              </Text>
            </Text>
            <Text style={{
                paddingTop: 40,
                fontSize: 20,
              }, styles.bold}>{this.state.pushEvent.repo.name}</Text>
            <Text>{this.state.pushEvent.payload.commits.length}</Text>
            <ListView
              contentInset = {{
                top: -50
              }}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              ></ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  payloadContainer: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bold:{
    fontWeight:  '800',
    fontSize: 16
  }
});

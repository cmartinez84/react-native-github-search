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
  Image
} from 'react-native';
import moment from 'moment';
import AuthService from './AuthService';
// const buffer =require('buffer');
type Props = {};

export default class Feed extends Component<Props> {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged:(r1, r2) => r1 != r2
    })
    this.state = {
      dataSource: ds,
      showProgress: true
    }
  }
  componentDidMount(){
    this.fetchFeed();
  }
  fetchFeed(){
    AuthService.getAuthInfo((err, authInfo)=>{
      var github_sn = authInfo.user.login;
      var url = `http://api.github.com/users/${github_sn}/received_events`;

      fetch(url, {
        headers: authInfo.header
      })
      .then((response)=>
        response.json())
      .then((responseData)=>{
        var feedItems = responseData.filter((ev)=>{
          return ev.type == 'PushEvent'
        })
        // console.log(feedItems);
        // console.log(this.state.dataSource.cloneWithRows(feedItems));
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        })

      })//end then
    })
  }
  renderRow(rowData){
      return(
        <View style={styles.rowStyle}>
          <Image
            style={{height: 36,
              width: 36,
              borderRadius: 18}}
            source={{uri:rowData.actor.avatar_url}}/>
          <View>
            <Text style={styles.actorDetailRow}>
              {moment(rowData.created_at).fromNow()}
            </Text>
            <Text style={styles.actorDetailRow, styles.bold}>
              {rowData.actor.login}
            </Text>
            <Text style={styles.actorDetailRow}>
                {rowData.payload.ref.replace('refs/heads/', '')}
            </Text>
            <Text style={styles.actorDetailRow}>
                at <Text style={styles.bold}>{rowData.repo.name}</Text>
            </Text>
          </View>
        </View>
        )
  }

  render() {
    if(this.state.showProgress){
      return (
        <View style={styles.progressing}>
          <ActivityIndicator
            size="large"
            animating={true}
            />
        </View>
      )
    }
    return (
      <View style={styles.listContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ this.renderRow.bind(this)}>
        </ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  progressing: {
    flex: 1,
    justifyContent: 'center'
  },
  actorRow:{
    paddingLeft: 20
  },
  actorDetailRow:{
    backgroundColor: '#fff'
  },
  bold: {
    fontWeight: '600'
  }

});

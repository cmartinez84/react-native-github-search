import  { AsyncStorage } from 'react-native';
var _ = require('lodash');
const authKey = 'auth';
const userKey = 'user';
var buffer = require('buffer');

class AuthService {
  getAuthInfo(cb){
    AsyncStorage.multiGet([authKey, userKey], (err, val)=>{
      if(err){
        return err;
      }
      if(!val){
        return cb();
      }
      var zippedObj = _.fromPairs(val);
      console.log(zippedObj);
      if(!zippedObj[authKey]){
        // console.log("bang");
        return cb();
      }
      var authInfo = {
        header: {
          Authorization: 'Basic' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }
      console.log(authInfo);
      return cb(null, authInfo);
    })

  }
  login(creds, cb){
    var b = new buffer.Buffer(`${creds.username}:${creds.password}`);
    var encodedAuth = b.toString('base64');
    let apiHeaders = {
      headers : {
        'Authorization': 'Basic ' + encodedAuth
      }
    }

    fetch('http://api.github.com/user', apiHeaders)
    .then((response)=>{
      if(response.status >= 200 && response.status < 300){
        return response
      }
      // if (response.status === 401) {
      //   throw 'bad credentials';
      // }
      //throw skips the next ten statements in chains and goes to error handler
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response)=>{
      return response.json();
    })
    .then((results)=>{
      AsyncStorage.multiSet([
        [authKey, encodedAuth],
        [userKey, JSON.stringify(results)]
      ], (err)=>{
        if(err){
          throw err;
        }
        console.log(AsyncStorage);
        return cb({success: true});
      })

    })
    .catch((err)=>{
      return cb(err);
    })
    .finally(()=>{
      //finally always exectures wether theres an error or not
      // this.setState({showProgress: false});
    })
  }
}
module.exports = new AuthService();

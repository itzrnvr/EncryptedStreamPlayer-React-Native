import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Alert,
  ActivityIndicator,
} from 'react-native';

// const url = 'https://github.com/facebook/react-native'
// const url = 'https://in.yahoo.com/?p=us'
const url = 'https://www.facebook.com/'

class TestWebView extends Component {
  render() {
    var renderTime = Date.now();

    return (
      <WebView
        source={{uri: url}}
        style={{marginTop: 20, flex: 1}}
        onLoad={() => {
          Alert.alert('On load event', `Loading time : ${Date.now() - renderTime}`)
        }}
      />
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
    }
  }

  render() {

    if (this.state.isLoaded) {
      return (
        <TestWebView />
      )
    }

    return (
      <View style={styles.container}>
        <View style={{height: 0, width: 0}}>
          <WebView
            source={{uri: url}}
            onLoad={() => {
              this.setState({isLoaded: true})
            }}
          />
        </View>
        <ActivityIndicator />
      </View>
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
});

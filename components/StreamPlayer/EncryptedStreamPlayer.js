import React, {useEffect, useState, useRef} from 'react';

//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Platform,
  Dimensions
} from 'react-native';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


//import WebView
import {WebView} from 'react-native-webview';
import HTML_FILE from '../../resources/index.html';
const isAndroid = Platform.OS === 'android';

const EncryptedStreamPlayer = (props) => {
    let webviewRef = useRef();
    const INJECTED_JAVASCRIPT = `(function() {
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener("load", function() {
                var message = {"status" : this.status, "response" : this.response}
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
            });
            open.apply(this, arguments);
        };})();`;

        const loadJavascript = (dataObject) => {
          console.log("Called loadJavascript", dataObject)
          webviewRef.injectJavaScript(`( function() { 
            document.dispatchEvent( new MessageEvent('message', { 
            data: ${JSON.stringify(dataObject)}, 
            origin : 'react-native' 
           })); })();` );
        }

        useEffect(()=> {
          if(props.videoUrl != "")
            loadJavascript({
              event: {
                type: "loadNewStream",
                url: props.videoUrl
              }
            })
        }, [props.videoUrl])
 

        if (isAndroid) {
          return (
            <WebView
                ref={(webView) => webviewRef = webView}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={event => {
                  console.log('>>>', event);
                }}
                javaScriptEnabled={true}
                scrollEnabled={false}
                allowsFullscreenVideo={true}
                style={styles.player}
                originWhitelist={['*']}
                source={{
                    uri: 'file:///android_asset/index.html'
                }}
                domStorageEnabled={true}
            />
          );
        } else {
          return (
            <WebView
                javaScriptEnabled={true}
                scrollEnabled={false}
                allowsFullscreenVideo={true}
                userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 
                (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                style={styles.player}
                originWhitelist={['*']}
                source={HTML_FILE}
                domStorageEnabled={true}
            />
          );
        }
};


const styles = StyleSheet.create({
    player: {
        borderColor: '#DC143C',
        borderWidth: 4,
        minWidth: width,
        minHeight: height,
        marginTop: 20
    }
})

export default EncryptedStreamPlayer
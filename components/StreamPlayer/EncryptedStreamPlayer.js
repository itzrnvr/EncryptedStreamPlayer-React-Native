import React, {useEffect, useState, useRef} from 'react';
import {useNetInfo} from "@react-native-community/netinfo";

//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Platform,
  Dimensions,
  Text,
  ImageBackground
} from 'react-native';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


//import WebView
import {WebView} from 'react-native-webview';
import HTML_FILE from '../../resources/index.html';
const isAndroid = Platform.OS === 'android';

const EncryptedStreamPlayer = (props) => {

    const netInfo = useNetInfo();
    let webviewRef = useRef();
    const isReady = useRef(false)

    const androidListener = `document.addEventListener("message", handleEvent)`
    const iosListener = `	window.addEventListener("message", handleEvent)`
  
    const INJECTED_JAVASCRIPT = `(function() {
      ${isAndroid ? androidListener : iosListener}
    })();`;

        const loadJavascript = (dataObject) => {
          console.log("Called loadJavascript", dataObject)
          webviewRef.injectJavaScript(`( function() { 
            document.dispatchEvent( new MessageEvent('message', { 
            data: ${JSON.stringify(dataObject)}, 
            origin : 'react-native' 
           })); })();` );
        }

        const loadNewVideo = (url)=> {
          if(url != "" && isReady && netInfo.isConnected)
            loadJavascript({
              event: {
                type: "loadNewStream",
                url: url
              }
            })          
        }

        useEffect(()=> {
          loadNewVideo(props.videoUrl)
        }, [props.videoUrl])
 
        if(!netInfo.isConnected){
          isReady.current = false
        }

        const handleWebEvents = (event) => {
          const data = JSON.parse(event.nativeEvent.data);
          console.log("FROM WebView", JSON.stringify(data))
        }

      
        return netInfo.isConnected ? ((isAndroid) ?
          (
            <WebView
                ref={(webView) => webviewRef = webView}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={event => {
                  // console.log('>>>', event);
                  handleWebEvents(event)
                }}
                javaScriptEnabled={true}
                scrollEnabled={false}
                allowsFullscreenVideo={true}
                style={styles.player}
                originWhitelist={['*']}
                source={{
                    // uri: 'file:///android_asset/index.html'
                    uri: "https://itzrnvr.github.io/EncryptedStreamPlayer-React-Native/"
                }}
                domStorageEnabled={true}
                onLoadStart={()=> {
                  props.onPlayerReady(false)
                }}
                onLoadEnd={() => {
                  props.onPlayerReady(true)
                  if(!isReady.current) {
                    isReady.current = true
                    loadNewVideo(props.videoUrl)
                  }
                }}
            />
          ) : (
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
                  // uri: 'file:///android_asset/index.html'
                  uri: "https://itzrnvr.github.io/EncryptedStreamPlayer-React-Native/"
              }}
              domStorageEnabled={true}
              onLoadStart={()=> {
                props.onPlayerReady(false)
              }}
              onLoadEnd={() => props.onPlayerReady(true)}
            />
          ) )
          : <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
              <Text style = {{color: '#000000', fontSize: 24}}>Please check your Internet</Text>
          </View>
        
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
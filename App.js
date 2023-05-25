// Load Local HTML File or URL in React Native using react-native-webview
// https://aboutreact.com/load-local-html-file-url-using-react-native-webview/

//import React in our code
import React, {useState} from 'react';
import EncryptedStreamPlayer from './components/StreamPlayer/EncryptedStreamPlayer';
//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Platform,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';

const App = () => {
  const [fragmentIndex, setFragmentIndex] = useState(3);
  const [url, setUrl] = useState("https://firebasestorage.googleapis.com/v0/b/stream-46b9f.appspot.com/o/testvideo%2Fmanifest.m3u8?alt=media&token=9cf47cac-998e-40f6-bdfb-31bb08f371ab")
  const [playerStatus, setPlayerStatus] = useState({
    playerReady: false
  })

  let textInput = ""

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Encrypted Stream</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.inputHead}>Enter encrypted hls URL</Text>
        <TextInput
          style={{margin: 5, height: 40, borderColor: 'gray', borderWidth: 3, color: "#000000" }}
          onChange={event => {
            const {eventCount, target, text} = event.nativeEvent;
            textInput = text
            if(text == ""){
              setUrl("")
            }
          }}
        />
        <Text style={styles.url}>{url}</Text>
        <Button
          title = "Load URL"
          onPress={()=> (textInput.includes("m3u8") || textInput == "") ? setUrl(textInput) : setUrl("Invalid HLS Stream")}
        />
      </View>
      {playerStatus.playerReady ? (
        	<View></View>
        ) : <View style={{ flex: 1, justifyContent: "center"}}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
      }
      <EncryptedStreamPlayer 
        index={fragmentIndex} 
        videoUrl={url} 
        onPlayerReady={(status)=> setPlayerStatus({
          ...playerStatus,
          playerReady: status
        })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 56,
    backgroundColor: "#1e90ff"
  },
  topBarText: {
    margin: 8,
    marginStart: 16,
    fontSize: 24,
    color: "#ffffff"
  },
  inputHead: {
    marginTop: 20,
    marginBottom: 8,
    color: "#000000"
  },
  container: {
    padding: 16,
  },
  input: {
    color: "Black"
  },
  url:{
    color: "#000000"
  }
});

export default App;
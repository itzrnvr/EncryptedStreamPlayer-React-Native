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
  TextInput
} from 'react-native';

const App = () => {
  const [fragmentIndex, setFragmentIndex] = useState(3);
  const [url, setUrl] = useState("")

  let textInput = ""

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Encrypted Stream</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.inputHead}>Enter encryptedd hls URL</Text>
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
      <EncryptedStreamPlayer index={fragmentIndex} videoUrl={url} />
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
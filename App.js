/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      photosData: [],
    }
  }

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          photosData: responseJson,
        }, function() {
          // do something with new state
          console.log(this.state.photosData);
          
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _keyExtractor = (item, index) => item.id;
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.photosData}
          keyExtractor={this._keyExtractor}
          numColumns= {2}
          renderItem={({item}) => 
            <View>
              {/* load url with HTTPS */}
              <ImageBackground 
                source={{
                  uri: item.url.slice(0, 4) + 's' + item.url.slice(4), 
                  cache: 'force-cache',
                }} 
                style={styles.image} 
                borderRadius={20} 
                borderWidth={2}
              >
                <Text style={styles.text}>{item.title}</Text>
              </ImageBackground>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  image: {
    borderRadius: 20,
    margin: 2,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: (Dimensions.get('window').height/3) - 12,
    width: (Dimensions.get('window').width/2) - 4,
  },
  text: {
    fontSize: 15,
    marginTop: 80,
    textAlign: 'center',
    transform: [{ rotate: '45deg'}],
  },
});

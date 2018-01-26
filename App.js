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
  _keyExtractor = (item, index) => item.id;
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {
              "albumId": 1,
              "id": 1,
              "title": "accusamus beatae ad facilis cum similique qui sunt",
              "url": "http://placehold.it/600/92c952",
              "thumbnailUrl": "http://placehold.it/150/92c952"
            },
            {
              "albumId": 1,
              "id": 2,
              "title": "reprehenderit est deserunt velit ipsam",
              "url": "http://placehold.it/600/771796",
              "thumbnailUrl": "http://placehold.it/150/771796"
            },
            {
              "albumId": 1,
              "id": 3,
              "title": "officia porro iure quia iusto qui ipsa ut modi",
              "url": "http://placehold.it/600/24f355",
              "thumbnailUrl": "http://placehold.it/150/24f355"
            },
            {
              "albumId": 1,
              "id": 4,
              "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
              "url": "http://placehold.it/600/d32776",
              "thumbnailUrl": "http://placehold.it/150/d32776"
            },
            {
              "albumId": 1,
              "id": 5,
              "title": "natus nisi omnis corporis facere molestiae rerum in",
              "url": "http://placehold.it/600/f66b97",
              "thumbnailUrl": "http://placehold.it/150/f66b97"
            }
          ]}
          keyExtractor={this._keyExtractor}
          numColumns= {2}
          renderItem={({item}) => 
            <View>
              {/* load url with HTTPS */}
              <ImageBackground source={{uri: item.url.slice(0, 4) + 's' + item.url.slice(4)}} style={styles.image} borderRadius={20} borderWidth={2} shadowColor={'#00ffff'}>
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

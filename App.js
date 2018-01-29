import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      photosData: [],
      reorder: false,
    }
    this.shuffle = this.shuffle.bind(this);
    this.shuffleRecursion = this.shuffleRecursion.bind(this);
  }

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ photosData: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  shuffle() {
    let array = this.state.photosData;
    let currentIndex = array.length, temporaryValue, randomIndex;
    return this.shuffleRecursion(array, currentIndex);
  }
  
  shuffleRecursion(array, currentIndex) {
    // If there no remain elements to shuffle...
    if(currentIndex === 0){
      return this.setState({ 
        photosData: array, 
        reorder: true 
      }, function() {
        // reset the reorder state
        this.setState({reorder: false})
      });
    }
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    let temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

    return this.shuffleRecursion(array, currentIndex);
  }

  _keyExtractor = (item, index) => item.url;
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.photosData}
          key={this.state.reorder}
          keyExtractor={this._keyExtractor}
          numColumns= {2}
          renderItem={({item}) => 
          <View>
              {/* load url with HTTPS */}
              <ImageBackground 
                source={{
                  uri: item.url.slice(0, 4) + 's' + item.url.slice(4), 
                  // cache downloaded photos (ios only)
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
        <Button
          onPress={this.shuffle}
          title="Reorder Photos"
          color="#841584"
          accessibilityLabel="Reorder Photos"
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

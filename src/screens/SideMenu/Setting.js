import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions, Platform,

} from 'react-native';
import {Header,Left,Title,Body,Icon,Button} from 'native-base';
export default class SettingScreen extends Component {
    static navigationOptions = {};

    constructor(props) {
    super(props);
  }
    onToggleClosePress(){
        this.props.navigation.goBack();
    }
  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Header style = {{backgroundColor: '#000'}}>
                <Left>
                    <TouchableOpacity onPress = { this.onToggleClosePress.bind(this)}>
                        <Text style={{color:'#fff'}}>Close</Text>
                    </TouchableOpacity>
                </Left>
                <Body>
                <Title>Setting</Title>
                </Body>
            </Header>
        <Text style={styles.welcome}>
          Setting
        </Text>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 28,
    color: '#999',
    textAlign: 'center',
  }
});

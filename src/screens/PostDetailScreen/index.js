import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  WebView,
} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
export default class PostDetailScreen extends Component {
  render() {
      let params=this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
          <Header style = {{backgroundColor: '#000'}}>
              <Left>
                  <Button transparent onPress = { this.onToggleClosePress.bind(this)}>
                      <Icon name='md-arrow-round-back'/>
                  </Button>
              </Left>
              <Body>
              <Title>More</Title>
              </Body>
          </Header>
          <WebView
         source={{uri:params.web}}
         style={{marginTop: 20}}
       />
      </View>
    );
  }
    onToggleClosePress(){
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({

});

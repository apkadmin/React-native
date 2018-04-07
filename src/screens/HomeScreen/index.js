import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions,
  LayoutAnimation
} from 'react-native';
import BackgroundJob from 'react-native-background-job';

import {Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import YourReadingList from './YourReadingList';
import {getSMSToApi} from '../../database/conectapi';
import {deleteSMSToLocal,readSMSToLocal} from '../../database/conectdatabase';
import SideMenu from "../SideMenu";
import {listSMS} from '../../database/pushsmstoserver';


var {height, width} = Dimensions.get('window');
const exactJobKey = "exactJobKey";
BackgroundJob.register({
    jobKey: exactJobKey,
    job: () => {
      AsyncStorage.getItem('TelePhone').then((phone) => {
          console.log(phone);
          getSMSToApi(phone);
          readSMSToLocal(phone);
          deleteSMSToLocal(phone);
          listSMS(phone);
      }).done();
    }
});
export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }
     componentDidMount() {
        BackgroundJob.schedule({
            jobKey: exactJobKey,
            period:10000,
            timeout: 10000,
            exact: true
        });
    }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header style = {Platform.OS == "android" ? {backgroundColor: '#000'} : styles.header}>
            {
              Platform.OS == "android" ?
              <Left>
                  <Button transparent onPress = { this.onToggleMenuPress.bind(this)}>
                      <Icon name='menu' />
                  </Button>
              </Left>
              : <View/>
            }
            <Body>
                <Title>Trang chủ</Title>
            </Body>
            <Right>
              {
                Platform.OS == "android" ?
                  <Button transparent onPress = {this.toNotificationScreen.bind(this)}>
                      <Icon name='notifications' />
                  </Button>
                : <View/>
              }

                <Button transparent onPress = {this.onModalPress.bind(this)}>
                    <Icon name='search' />
                </Button>

            </Right>
        </Header>
        <ScrollView>
          <YourReadingList onPress={(data)=>this.toPostDetailScreen(data)}/>
        </ScrollView>
      </View>
    );
  }

    toPostDetailScreen(data){
        this.props.navigation.navigate('Post',{web:data});
    }
  toNotificationScreen() {
      this.props.navigation.navigate('Notification');
  }

  onToggleMenuPress(){
      this.props.navigation.navigate('DrawerOpen');
  }
  onModalPress() {
    this.props.navigation.navigate('SearchPageScreen');
  }
}

const styles = StyleSheet.create({
  hideButtonWritePost: {
    width: 0,
    height: 0
  },
  buttonWritePostStyle: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});

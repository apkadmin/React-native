import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Container,Card, CardItem, Content, ListItem, Text, Left, Right, Body, Thumbnail, Button } from 'native-base';

export default class SideMenu extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
                <View style={styles.UserInfoContainerStyle}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('../../img/movan.jpg')}/>
                            <View>
                                <Text>Movan</Text>
                                <Text style={{alignItems: 'center', color: 'red'}}>Kinh doanh - Đột phá</Text>
                            </View>
                        </Left>
                        <Body>

                        </Body>
                    </CardItem>
                </View>
                <View style={{marginTop: 20, backgroundColor: '#fff'}}>
                    <ListItem onPress={this.onPressSideMenuItemHome.bind(this)}>
                        <Text>Trang chủ</Text>
                    </ListItem>
                    <ListItem onPress={this.onPressSideMenuItemGetSMS.bind(this)}>
                        <Text>Tin đến</Text>
                    </ListItem>
                    <ListItem onPress={this.onPressSideMenuItemSendSMS.bind(this)}>
                        <Text>Gửi tin</Text>
                    </ListItem>
                </View>
                <View style={{marginTop: 20, backgroundColor: '#fff'}}>
                    <ListItem onPress={this.onPressSideMenuItemSetting.bind(this)}>
                        <Text>Settings</Text>
                    </ListItem>
                    <ListItem onPress={this.onPressSideMenuItem.bind(this)}>
                        <Text>Help</Text>
                    </ListItem>
                </View>
            </ScrollView>
        );
    }
    onPressSideMenuItem() {
        this._toggleDrawer();
    }

     onPressSideMenuItemSetting() {
        this._toggleDrawer();
        this.props.navigation.navigate('Setting');
    }
    onPressSideMenuItemHome() {
        this._toggleDrawer();
    }

    onPressSideMenuItemSendSMS(){
        this._toggleDrawer();
        this.props.navigation.navigate('SendSMS');
    }
    onPressSideMenuItemGetSMS(){
        this._toggleDrawer();
        this.props.navigation.navigate('GetSMS');
    }
    _toggleDrawer() {
        this.props.navigation.navigate('DrawerClose');
    }
}


const styles = {
  UserInfoContainerStyle: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30
  }
}

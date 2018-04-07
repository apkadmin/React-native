import React,{Component} from 'react';
import {Dimensions} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import SideMenu from './screens/SideMenu';
import SearchPageScreen from './screens/SearchPageScreen';
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from './screens/NotificationScreen';
import PostDetailScreen from './screens/PostDetailScreen/index';
import SettingScreen from './screens/SideMenu/Setting';
import SendScreen from './screens/SideMenu/SendSMS';
import GetScreen from './screens/SideMenu/GetSMS';
import Chats from './screens/SideMenu/Chat/chats';
var {height, width} = Dimensions.get('window');
const App = DrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Notification: {
            screen: NotificationScreen,
        },
        SearchPageScreen:{
            screen:SearchPageScreen,
        },
        Post:{
            screen:PostDetailScreen,
        },
         Setting:{
            screen:SettingScreen,
        },
         SendSMS:{
            screen:SendScreen,
        },
        GetSMS:{
            screen:GetScreen,
        },
        Chat:{
            screen:Chats,
        },
    }, {
        contentComponent: SideMenu,
        drawerWidth:2*width/3,
    },);
export default App;
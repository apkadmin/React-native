import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import {Header,Left,Title,Body,Icon,Button} from 'native-base';
export default class Chats extends Component {
    static navigationOptions = {};

    constructor(props) {
        super(props);
    }
    onToggleClosePress(){
        this.props.navigation.navigate('GetSMS');
    }
    render() {
        let params=this.props.navigation.state.params;
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header style = {{backgroundColor: '#000'}}>
                    <Left>
                        <Button transparent onPress = { this.onToggleClosePress.bind(this)}>
                            <Icon name='md-arrow-round-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{params.sms.address}</Title>
                    </Body>
                </Header>
                <View>
                    <Text style={{color:'#111'}}>{params.sms.body}</Text>
                </View>
            </View>
        );
    }

}

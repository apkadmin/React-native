import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform,
    AppRegistry,
    TextInput,
    Alert,
    ListView,
    Image
} from 'react-native';
import {Header,Left,Title,Body,Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import SmsAndroid from 'react-native-get-sms-android';
var {height, width} = Dimensions.get('window');
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class GetScreen extends Component {
    static navigationOptions = {};

    constructor(props) {
    super(props);
     this.state = {
         dataSource:ds,
        };

        this.listSMS();
  }
    onToggleClosePress(){
        this.props.navigation.goBack();
    }
    _renderRow(rowData) {
        let time= new Date(rowData.date);
        return (
            <TouchableOpacity style={ styles.row }  onPress={()=>{this._pressProduct(rowData)}}>
                <View style={styles.container}>
                    <View style={{flex:1, flexDirection: 'row', height: 70}}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <Image style={ styles.avatar } source={require('../../../img/avata_default.jpg')} />
                        </View>

                        <View style={{flex:3, flexDirection: 'column'}}>
                            <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between'}}>
                                <Text style={styles.text}>{rowData.address}</Text>
                                <Text style={styles.small_text}>{time.getDate()+' th '+time.getMonth()}</Text>

                            </View>
                            <View style={{flex:1, flexDirection: 'row'}}>
                                <Icon name='check' size={ 15 }/>
                                <Text style={styles.small_text}>{rowData.body}</Text>
                            </View>
                        </View>

                        <View style={{flex:.5, flexDirection: 'row'}}>
                            <View style={{flex:1, flexDirection: 'row', justifyContent:'flex-end', alignItems:'center'}}>
                                <TouchableOpacity style={{}}>
                                    <Icon name='chevron-right' size={ 20 }/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
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
                <Title>Hộp thư đến</Title>
                </Body>
            </Header>
            <Body>
            <View style={{ paddingBottom: 15, flexDirection: 'column',width:width}}>
                <ListView
                    style={{backgroundColor: '#fff'}}
                    dataSource={this.state.dataSource}
                    renderRow={ this._renderRow.bind(this) }
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                </View>
            </Body>
      </View>
    );
  }

    _pressProduct(sms){
            this.props.navigation.navigate('Chat',{sms:sms});
  }
    listSMS() {
        var filter = {
            box: 'sent',
        };
        SmsAndroid.list(JSON.stringify(filter), (fail) => {
            console.log(fail)
        }, (count, smsList) => {
            var arr = JSON.parse(smsList);
            this.setState({dataSource:ds.cloneWithRows(arr)});
        });
    }
}

var styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        height: 100
    },
    shoppingCart: {
        position: 'absolute',
        top: 15,
        right: 15,
        color:'#777777'
    },
    container_column: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        fontWeight: '500',
    },

    small_text: {
        fontSize: 13,
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    txt_device:{
        fontSize: 13
    }
});

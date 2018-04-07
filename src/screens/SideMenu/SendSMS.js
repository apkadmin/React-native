import {TouchableOpacity,TextInput,View,StyleSheet,Text,Dimensions, AsyncStorage} from 'react-native';
import {Header,Left,Body,Title} from 'native-base';
import React,{Component} from 'react';
import {errorsmessage} from '../../services/errors';
var {height, width} = Dimensions.get('window');
export default class SendScreen extends Component{
	constructor(props){
        super(props);
        this.state={
            phoneNumber:'',
            placeHolder:'phone number',
            editTable:true,
            queue:null,
        }
    }
     async componentWillMount(){
     	AsyncStorage.getItem('TelePhone').then((result) => {
      if(result!=null){
      	this.setState({phoneNumber: result});
      }
      if (this.state.phoneNumber!=''){
            this.setState({editTable:false,placeHolder:result});
        }
    }).done();
    }
	render(){
		return(
			<View style={{flex: 1, backgroundColor: '#fff'}}>
            	<Header style = {{backgroundColor: '#000'}}>
                <Left>
                    <TouchableOpacity onPress = {this.onToggleClosePress.bind(this)}>
                        <Text style={{color:'#fff'}}>Close</Text>
                    </TouchableOpacity>
                </Left>
                <Body>
                <Title>Gửi tin</Title>
                </Body>
            	</Header>
            	<View style={{padding:20,}}>
            	  <Text style={ styles.label }>TelePhone Number</Text>
            		<TextInput style= {styles.input}
            		placeholder={this.state.placeHolder}
                    placeholderTextColor={'#cbcbcb'}
            		returnKeyType={'next'}
            		keyboardType={'numeric'}
            		onChangeText={(text)=>{this.setState({phoneNumber:text})}}
            		editable={this.state.editTable}
            		/>
            		<TouchableOpacity style={styles.button} onPress={this.saveData.bind(this)}>
            			<Text style={{color:'#fff'}}>Save</Text>
            		</TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.changeData.bind(this)}>
                        <Text style={{color:'#fff'}}>Change</Text>
                    </TouchableOpacity>
            	</View>
			</View>
			);
	};

	onToggleClosePress(){
        this.props.navigation.goBack();
    };
 	changeData(){
        this.setState({editTable:true});
    }
	saveData(){
        if (this.state.phoneNumber=='')
        {
            errorsmessage('Not Phone Number');
        }
        else
        {
            this.setState({editTable:false,placeHolder:this.state.phoneNumber});
           AsyncStorage.setItem('TelePhone',this.state.phoneNumber);
        }
    }

}
const styles = StyleSheet.create({
	button:{
        marginBottom:10,
		height: 35,
        backgroundColor:'#0765d7',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
	},
	label: {
        color: '#777777',
    },
    input: {
        marginBottom: 15,
        height: 40,
        borderColor: '#cbcbcb',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight:10,
        marginLeft:10,
        color: '#000',
        fontSize: 14,
        borderRadius: 3,
        marginTop: 5,
        backgroundColor: '#fff',
        paddingBottom: 0
    }
})
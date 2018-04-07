import React, {Component} from 'react';
import {
  View,
  ListView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import { Grid,Col,Container, Content, Card, CardItem, Left,Right, Body, Thumbnail, Text, Button, Icon, H3 } from 'native-base';


let { width, height } = Dimensions.get('window');
let initWidth = width / 2 - 10;
let initHeight = initWidth * 0.7;
let URL1='http://nguyenvanan.tk/getpost';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource:ds,
        };
        fetch(URL1, {
            method: 'POST',
            headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
        }) .then((response) => response.json()).then((responseData) => {
            this.setState({dataSource: ds.cloneWithRows(responseData)});
        }).done();
    }
  _renderRow(dataItem) {
    return (
        <Card style = {{marginLeft: 0, marginRight: 0, marginTop: 0}}>
            <CardItem onPress={this.props.onPress}>
              <Left>
                  <Thumbnail source= {{uri: dataItem.post_content}} />
                  <Body>
                      <Text>Movan</Text>
                      <Text note>Kinh doanh đột phá</Text>
                  </Body>
              </Left>
            </CardItem>
            <Grid>
                <Col size = {70}>
                    <CardItem header  onPress={this.props.onPress(dataItem.guid)}>
                      <H3>{dataItem.post_title}</H3>
                    </CardItem>
                    <CardItem content  onPress={this.props.onPress(dataItem.guid)}>
                        <Text numberOfLines = {2}>{dataItem.description}</Text>
                    </CardItem>
                </Col>
                <Col size = {30}>
                  <CardItem cardBody  onPress={this.props.onPress(dataItem.guid)}>
                      <Image style={styles.imageStyle} source= {{uri: dataItem.post_content}} />
                  </CardItem>
                </Col>
            </Grid>
            <CardItem bordered onPress={this.props.onPress(dataItem.guid)}>
              <Left>
                  <Button transparent>
                      <Icon name="heart" />
                      <Text> 12 Likes</Text>
                  </Button>
              </Left>
              <Body>
                  <Button transparent>
                      <Icon name="chatbubbles" />
                      <Text>4 responses</Text>
                  </Button>
              </Body>
              <Right>
                <Button transparent>
                    <Icon name="bookmark" />
                </Button>
              </Right>
          </CardItem>
      </Card>
    )
  }
  render() {
    return (
      <View style = {styles.containerStyle}>
        <ListView
          style={styles.listViewContainerStyle}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          />
      </View>
    );
  }
  onPressCardItem() {
    this.props.navigator.push({
        screen: 'rnaz.HomeScreen',
        title: 'ASOS JOIN',
        passProps: {},
        aminateed: true,
    })
  }
}

const styles = {
  containerStyle: {
    marginTop: 10
  },
  headerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  headerStyle: {
    fontWeight: '500'
  },
  exploreStyle: {
    color: '#999',
    fontWeight: '500'
  },
  listViewContainerStyle: {

  },
  itemListViewStyle: {
    marginRight: 10,
    padding: 0
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
}

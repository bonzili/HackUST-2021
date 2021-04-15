import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import {
    GiftedChat
} from 'react-native-gifted-chat';

const axios = require('axios').default;

const BOT_USER = {
    _id: 2,
    name: 'Memo',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};



class App extends React.Component {
    state = {
        messages: [{
            _id: 1,
            text: `Hi, I am Memo. I am your memory keeper in the Memory By Memory App. Please start by saying hi.`,
            createdAt: new Date(),
            user: BOT_USER
        }] , maintext: "testing",
    };
    


    counter = 1;
    random_user_id = Math.floor(Math.random() * 10000000000).toString();

    componentDidMount() {
        // Dialogflow_V2.setConfiguration(
        //   dialogflowConfig.client_email,
        //   dialogflowConfig.private_key,
        //   Dialogflow_V2.LANG_ENGLISH_US,
        //   dialogflowConfig.project_id
        // );
    };

    handleResponse(result) {
        let text = result;
        this.sendBotResponse(text);
        this.counter += 1;
    };



    requestQuery(query , count){
        console.log(52);

        let list = {};
        var instance = axios.create();
        instance.post('http://23.21.182.147:8001/text/', {"user_id":this.random_user_id, "count": count.toString(),"text":query},{
        timeout: 10000
        }).then(function (response) {
            console.log(response.data);
            setState({ maintext: response.data })
            console.log(response.data);
        )
            .catch(function (error) {

                list = "I am really sorry but Memo is currently offline. Can we talk some other time? Thank you";
                
            })
            .then(function () {
                // always executed
            });
        // console.log(this.state.maintext);
        return list;
    };


    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        // Dialogflow_V2.requestQuery(
        //   message,
        //   result => this.handleGoogleResponse(result),
        //   error => console.log(error)
        // );

        var text___ = this.requestQuery(message, this.counter);
        console.log(93);
        console.log(text___);

    }

    sendBotResponse(text) {
        let msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date(),
            user: BOT_USER
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#fff'}} >
            <GiftedChat messages = {this.state.messages} onSend = {messages => this.onSend(messages)}
                        user={{ _id: 1 }} />
            </View>
            
        );
    }
}

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#fffde9';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;

const styles = StyleSheet.create({
    emptyContainer: {
        alignSelf: 'stretch',
        backgroundColor: BACKGROUND_COLOR,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: BACKGROUND_COLOR,
        minHeight: DEVICE_HEIGHT,
        maxHeight: DEVICE_HEIGHT,
    },
});

export default App;
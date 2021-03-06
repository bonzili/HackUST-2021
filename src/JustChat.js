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

const boticon = require('../assets/icon_280_280.png')

const BOT_USER = {
    _id: 2,
    name: 'Memo',
    avatar: boticon
};

const fetch = require('node-fetch');

class App extends React.Component {
    state = {
        messages: [{
            _id: 1,
            text: `Hi, I am Memo! I am your memory keeper in the Memory By Memory App! Please start by saying hi ٩(●ᴗ●)۶`,
            createdAt: new Date(),
            user: BOT_USER
        }]
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


    requestQuery(query , count){;
        fetch('https://23.21.182.147:8001/text/', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: this.random_user_id, count: count, text: query})
        }).then(res => res.json())
            .then(res => this.handleResponse(res));

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
            <View style={{flex: 1,backgroundColor: '#FFFDE9'}} >
                <GiftedChat messages = {this.state.messages} onSend = {messages => this.onSend(messages)}
                            user={{ _id: 1 }} />
            </View>

        );
    }
}

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export default App;

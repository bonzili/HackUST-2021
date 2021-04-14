import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    Dimensions,
    Image,
    Slider,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    NativeModule,
    NativeModules,
    Alert,
    Button

} from 'react-native';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Constants, Google } from 'expo';


import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';
import { runSample } from './funfunc';

class Icon {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync();
    }
}

const ICON_RECORD_BUTTON = new Icon(require('./assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('./assets/images/record_icon.png'), 20, 14);

const ICON_PLAY_BUTTON = new Icon(require('./assets/images/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('./assets/images/pause_button.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('./assets/images/stop_button.png'), 22, 22);

const ICON_MUTED_BUTTON = new Icon(require('./assets/images/muted_button.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new Icon(require('./assets/images/unmuted_button.png'), 67, 58);

const ICON_TRACK_1 = new Icon(require('./assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('./assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('./assets/images/thumb_2.png'), 15, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;


const projectId = 'grandpa-spsw';


const keyFilename = '/Users/matthewchuang/Documents/GitHub/HackUST-2021/assets/grandpa-spsw-771e9f21ab03.json';
// const storage = new Storage({projectId, keyFilename});


const BOT_USER = {
    _id: 2,
    name: 'FAQ Bot',
    avatar: 'https://i.imgur.com/7k12EPD.png'
  };
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.recording = null;
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.state = {
            haveRecordingPermissions: false,
            isLoading: false,
            isPlaybackAllowed: false,
            muted: false,
            soundPosition: null,
            soundDuration: null,
            recordingDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isRecording: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            messages: [
                {
                  _id: 1,
                  text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
                  createdAt: new Date(),
                  user: BOT_USER // <= note this
                }
              ]
        };
        this.dialogflowInfo = {
            projectId: "grandpa-spsw",
            sessionId: 1,
            queries: ["I am sad", "i am happy"],
            languageCode: 'en',
        };
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
        // // UNCOMMENT THIS TO TEST maxFileSize:
        // this.recordingSettings.android['maxFileSize'] = 12000;
    }

    
    componentDidMount() {
        this._askForPermissions();
        console.log("11111111111111111111111111111111111111111");
        runSample();
        console.log("2222222222222222222222222222222222222222222222222");
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        );

    }
    
    _load_dialogflow = async () =>{
        process.env.GOOGLE_APPLICATION_CREDENTIALS="/Users/matthewchuang/Documents/GitHub/HackUST-2021/voicebot/src/JustTalk/assets/grandpa-spsw-7a2dcb04f208.json";
    };
    
    runSample = async (projectId = 'grandpa-spsw') => {
        // A unique identifier for the given session
        const sessionId = uuid.v4();
        process.env.GOOGLE_APPLICATION_CREDENTIALS = "/Users/matthewchuang/Documents/2_spring/voicebot/grandpa-spsw-343c5ce7650e.json";
        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
      
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: 'hello',
                    // The language used by the client (en-US)
                    languageCode: 'en-US',
                },
            },
        };
      
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
        } else {
            console.log(`  No intent matched.`);
        };
    };




    onSend(messages = []) {
        // this.setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, messages)
        // }));
        this.runSample();
        // let message = messages[0].text;
        Dialogflow_V2.requestQuery(
          message,
          result => this.handleGoogleResponse(result),
          error => console.log(error)
        );
    }

    handleGoogleResponse(result) {
        console.log(result);
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        this.sendBotResponse(text);
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
    
    // _load_dialogflow = async () => {
    //     const client = await new APIClient({ grpc })
    //     const sessionClient = await new dialogflow.SessionsClient();
    // };

    // _detectIntent = async (projectId, sessionId, query, contexts,languageCode) => {
    //     const sessionPath = sessionClient.projectAgentSessionPath(
    //         projectId,
    //         sessionId
    //       );
        
    //       // The text query request.
    //       const request = {
    //         session: sessionPath,
    //         queryInput: {
    //           text: {
    //             text: query,
    //             languageCode: languageCode,
    //           },
    //         },
    //       };
        
    //       if (contexts && contexts.length > 0) {
    //         request.queryParams = {
    //           contexts: contexts,
    //         };
    //       }
        
    //       const responses = await sessionClient.detectIntent(request);
    //       return responses[0];
    // };

    // _executeQueries = async (projectId, sessionId, queries, languageCode) => {
    //     let context;
    //     let intentResponse;
    //     for (const query of queries) {
    //         try {
    //         console.log(`Sending Query: ${query}`);
    //         intentResponse = await detectIntent(
    //             projectId,
    //             sessionId,
    //             query,
    //             context,
    //             languageCode
    //         );
    //   console.log('Detected intent');
    //   console.log(
    //     `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
    //         );
    //         // Use the context from this response for next queries
    //         context = intentResponse.queryResult.outputContexts;
    //         } catch (error) {
    //         console.log(error);
    //         }
    //     }

    // }

    _askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({
            haveRecordingPermissions: response.status === 'granted',
        });
    };

    _updateScreenForSoundStatus = status => {
        if (status.isLoaded) {
            this.setState({
                soundDuration: status.durationMillis,
                soundPosition: status.positionMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                shouldCorrectPitch: status.shouldCorrectPitch,
                isPlaybackAllowed: true,
            });
        } else {
            this.setState({
                soundDuration: null,
                soundPosition: null,
                isPlaybackAllowed: false,
            });
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _updateScreenForRecordingStatus = status => {
        if (status.canRecord) {
            this.setState({
                isRecording: status.isRecording,
                recordingDuration: status.durationMillis,
            });
        } else if (status.isDoneRecording) {
            this.setState({
                isRecording: false,
                recordingDuration: status.durationMillis,
            });
            if (!this.state.isLoading) {
                this._stopRecordingAndEnablePlayback();
            }
        }
    };

    async _stopPlaybackAndBeginRecording() {
        this.setState({
            isLoading: true,
        });
        if (this.sound !== null) {
            await this.sound.unloadAsync();
            this.sound.setOnPlaybackStatusUpdate(null);
            this.sound = null;
        }
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });
        if (this.recording !== null) {
            this.recording.setOnRecordingStatusUpdate(null);
            this.recording = null;
        }

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(this.recordingSettings);
        recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

        this.recording = recording;
        await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
        this.setState({
            isLoading: false,
        });
    }

    async _stopRecordingAndEnablePlayback() {
        this.setState({
            isLoading: true,
        });
        try {
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
        const info = await FileSystem.getInfoAsync(this.recording.getURI());
        console.log(`FILE INFO: ${JSON.stringify(info)}`);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });
        const { sound, status } = await this.recording.createNewLoadedSoundAsync(
            {
                isLooping: true,
                isMuted: this.state.muted,
                volume: this.state.volume,
                rate: this.state.rate,
                shouldCorrectPitch: this.state.shouldCorrectPitch,
            },
            this._updateScreenForSoundStatus
        );
        this.sound = sound;
        this.setState({
            isLoading: false,
        });
    }

    _onRecordPressed = () => {
        if (this.state.isRecording) {
            this._stopRecordingAndEnablePlayback();
        } else {
            this._stopPlaybackAndBeginRecording();
        }
    };

    _onPlayPausePressed = () => {
        if (this.sound != null) {
            if (this.state.isPlaying) {
                this.sound.pauseAsync();
            } else {
                this.sound.playAsync();
            }
        }
    };

    _onStopPressed = () => {
        if (this.sound != null) {
            this.sound.stopAsync();
        }
    };

    _onMutePressed = () => {
        if (this.sound != null) {
            this.sound.setIsMutedAsync(!this.state.muted);
        }
    };

    _onVolumeSliderValueChange = value => {
        if (this.sound != null) {
            this.sound.setVolumeAsync(value);
        }
    };

    _trySetRate = async (rate, shouldCorrectPitch) => {
        if (this.sound != null) {
            try {
                await this.sound.setRateAsync(rate, shouldCorrectPitch);
            } catch (error) {
                // Rate changing could not be performed, possibly because the client's Android API is too old.
            }
        }
    };

    _onRateSliderSlidingComplete = async value => {
        this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
    };

    _onPitchCorrectionPressed = async value => {
        this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
    };

    _onSeekSliderValueChange = value => {
        if (this.sound != null && !this.isSeeking) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            this.sound.pauseAsync();
        }
    };

    _onSeekSliderSlidingComplete = async value => {
        if (this.sound != null) {
            this.isSeeking = false;
            const seekPosition = value * this.state.soundDuration;
            if (this.shouldPlayAtEndOfSeek) {
                this.sound.playFromPositionAsync(seekPosition);
            } else {
                this.sound.setPositionAsync(seekPosition);
            }
        }
    };

    _getSeekSliderPosition() {
        if (
            this.sound != null &&
            this.state.soundPosition != null &&
            this.state.soundDuration != null
        ) {
            return this.state.soundPosition / this.state.soundDuration;
        }
        return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getPlaybackTimestamp() {
        if (
            this.sound != null &&
            this.state.soundPosition != null &&
            this.state.soundDuration != null
        ) {
            return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
                this.state.soundDuration
            )}`;
        }
        return '';
    }

    _getRecordingTimestamp() {
        if (this.state.recordingDuration != null) {
            return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
        }
        return `${this._getMMSSFromMillis(0)}`;
    }

    render() {
        /*if(!this.state.fontLoaded) {
            return (
                <View style={styles.emptyContainer} />
            )
        }
*/
        if (!this.state.haveRecordingPermissions){
            return (
                <View style={styles.container}>
                    <View />
                    <Text style={[styles.noPermissionsText]}>
                        You must enable audio recording permissions in order to use this app.
                    </Text>
                    <View />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
        );
    }
}

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
    noPermissionsText: {
        textAlign: 'center',
    },
    wrapper: {},
    halfScreenContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        minHeight: DEVICE_HEIGHT / 2.0,
        maxHeight: DEVICE_HEIGHT / 2.0,
    },
    recordingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        minHeight: ICON_RECORD_BUTTON.height,
        maxHeight: ICON_RECORD_BUTTON.height,
    },
    recordingDataContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: ICON_RECORD_BUTTON.height,
        maxHeight: ICON_RECORD_BUTTON.height,
        minWidth: ICON_RECORD_BUTTON.width * 3.0,
        maxWidth: ICON_RECORD_BUTTON.width * 3.0,
    },
    recordingDataRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: ICON_RECORDING.height,
        maxHeight: ICON_RECORDING.height,
    },
    playbackContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        minHeight: ICON_THUMB_1.height * 2.0,
        maxHeight: ICON_THUMB_1.height * 2.0,
    },
    playbackSlider: {
        alignSelf: 'stretch',
    },
    liveText: {
        color: LIVE_COLOR,
    },
    recordingTimestamp: {
        paddingLeft: 20,
    },
    playbackTimestamp: {
        textAlign: 'right',
        alignSelf: 'stretch',
        paddingRight: 20,
    },
    image: {
        backgroundColor: BACKGROUND_COLOR,
    },
    textButton: {
        backgroundColor: BACKGROUND_COLOR,
        padding: 10,
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonsContainerTopRow: {
        maxHeight: ICON_MUTED_BUTTON.height,
        alignSelf: 'stretch',
        paddingRight: 20,
    },
    playStopContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
        maxWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
    },
    volumeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0,
    },
    volumeSlider: {
        width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
    },
    buttonsContainerBottomRow: {
        maxHeight: ICON_THUMB_1.height,
        alignSelf: 'stretch',
        paddingRight: 20,
        paddingLeft: 20,
    },
    rateSlider: {
        width: DEVICE_WIDTH / 2.0,
    },
});

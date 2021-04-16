import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Speech from 'expo-speech'

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


const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#fffde9';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.recording = null;
        this.sound = null;

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
        };
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
        // // UNCOMMENT THIS TO TEST maxFileSize:
        // this.recordingSettings.android['maxFileSize'] = 12000;
    }

    componentDidMount() {
        this._askForPermissions();
    }

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

    listVoices = async() => {
        let voices = await Speech.getAvailableVoicesAsync()
        console.log('Voices:', voices)
    }

    _onRecordPressed = () => {
        //Speech.speak('Hello How Are You',{language:'en-US'})

        if (this.state.isRecording) {
            this._stopRecordingAndEnablePlayback();
        } else {
            this._stopPlaybackAndBeginRecording();
        }
    };

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


    _getRecordingTimestamp() {
        if (this.state.recordingDuration != null) {
            return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
        }
        return `${this._getMMSSFromMillis(0)}`;
    }

    render() {
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
            <View style={styles.container}>
                <View
                    style={[
                        styles.halfScreenContainer,
                        {
                            opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
                        },
                    ]}>
                    <View />
                    <View style={styles.recordingContainer}>
                        <View />
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={this._onRecordPressed}
                            disabled={this.state.isLoading}>
                            <Image style={styles.image} source={ICON_RECORD_BUTTON.module} />
                        </TouchableHighlight>
                        <View style={styles.recordingDataContainer}>
                            <View />
                            <Text style={[styles.liveText]}>
                                {this.state.isRecording ? 'Recording' : ''}
                            </Text>
                            <View style={styles.recordingDataRowContainer}>
                                <Image
                                    style={[styles.image, { opacity: this.state.isRecording ? 1.0 : 0.0 }]}
                                    source={ICON_RECORDING.module}
                                />
                                <Text style={[styles.recordingTimestamp]}>
                                    {this._getRecordingTimestamp()}
                                </Text>
                            </View>
                            <View />
                        </View>
                        <View />
                    </View>
                    <View />
                </View>
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
        flexDirection: 'column',
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

});

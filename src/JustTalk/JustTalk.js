import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import {Button} from 'react-native-elements'
import * as Permissions from "expo-permissions";
import styles_default from "../styles";

export default function App() {
    const [recording, setRecording] = React.useState();

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }

    return (
        <View style={styles_default.container}>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
        </View>
    );
}

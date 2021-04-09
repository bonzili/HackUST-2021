import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import styles_default from "./styles";
import JustTalk from "./JustTalk/JustTalk";
import TDML from "./TDML";
import SendAMessage from "./SendAMessage";

let username = "hi";

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles_default.container}>
            <View style={styles_default.header}>
                <Text style={styles_default.title}>
                    Tales of the Old 老聲長談
                </Text>
                <Text style={styles_default.title}>
                    Welcome Back, {username}
                </Text>
                <Text style={styles_default.title}>
                    What do you want to do today?
                </Text>
            </View>
            <View style={styles_default.horizontal_container}>
                <View style={styles_default.buttonContainer}>
                    <Button
                        title="Just Talk"
                        onPress={() => navigation.navigate('Just Talk')}
                    />
                </View>
                <View style={styles_default.space} />
                <View style={styles_default.buttonContainer}>
                    <Button
                        title="Send a Message"
                        onPress={() => navigation.navigate('Send a Message')}
                    />
                </View>
            </View>
            <View style={styles_default.horizontal_container}>
                <View style={styles_default.buttonContainer}>
                    <Button
                        title="Trip Down Memory Lane"
                        onPress={() => navigation.navigate('Trip Down Memory Lane')}
                    />
                </View>
                <View style={styles_default.space} />
                <View style={styles_default.buttonContainer}>
                    <Button
                        title="Music"
                        onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>
            </View>
            <View style={styles_default.horizontal_container}>
                <View style={styles_default.buttonContainer}>
                    <Button
                        title="Edit Profile"
                        onPress={() => navigation.navigate('Just Talk')}
                    />
                </View>
                <View style={styles_default.space} />
                <View style={styles_default.buttonContainer}>
                    <Button
                        title="Add Contact"
                        onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>
            </View>
            <View style={styles_default.horizontal_container}>
                <Button
                    title="Help"
                    onPress={() => Alert.alert('Right button pressed')}
                />
            </View>
        </SafeAreaView>
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Just Talk" component={JustTalk} />
                <Stack.Screen name="Trip Down Memory Lane" component={TDML} />
                <Stack.Screen name="Send a Message" component={SendAMessage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

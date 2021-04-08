import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import styles_default from "./styles";

const TDML = () => (
    <SafeAreaView style={styles_default.container}>
        <View style={styles_default.header}>
            <Text style={styles_default.title}>
                Trip Down Memory Lane
            </Text>
        </View>
        <View style={styles_default.horizontal_container}>
            <View style={styles_default.buttonContainer}>
                <Button
                    title="Inbox"
                    onPress={() => navigation.navigate('Just Talk')}
                />
            </View>
            <View style={styles_default.space} />
            <View style={styles_default.buttonContainer}>
                <Button
                    title="Daily Log"
                    onPress={() => Alert.alert('Right button pressed')}
                />
            </View>
        </View>
        <View style={styles_default.horizontal_container}>
            <View style={styles_default.buttonContainer}>
                <Button
                    title="News Discussions"
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
                    title="My Interests"
                    onPress={() => navigation.navigate('Just Talk')}
                />
            </View>
            <View style={styles_default.space} />
            <View style={styles_default.buttonContainer}>
                <Button
                    title="Past Music I Listened To"
                    onPress={() => Alert.alert('Right button pressed')}
                />
            </View>
        </View>
    </SafeAreaView>
);

export default TDML;

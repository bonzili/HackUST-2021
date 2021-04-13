import React from 'react';
import {StyleSheet, Button, View, SafeAreaView, Text, Alert, AsyncStorage} from 'react-native';
import styles_default from "./styles";

let name = "User";

class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this._retrievename();
    }


    _retrievename = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                name = value
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {
        return (
            <SafeAreaView style={styles_default.container}>
                <View style={styles_default.header}>
                    <Text style={styles_default.title}>
                        Welcome Back,
                    </Text>
                    <Text style={styles_default.title}>
                        {name}
                    </Text>
                </View>
                <View style={styles_default.horizontal_container}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Just Talk"
                            onPress={() => this.props.navigation.navigate('Just Talk')}
                        />
                    </View>
                    <View style={styles_default.space}/>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Send a Message"
                            onPress={() => this.props.navigation.navigate('Send a Message')}
                        />
                    </View>
                </View>
                <View style={styles_default.horizontal_container}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Trip Down Memory Lane"
                            onPress={() => this.props.navigation.navigate('Trip Down Memory Lane')}
                        />
                    </View>
                    <View style={styles_default.space}/>
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
                            onPress={() => this.props.navigation.navigate('Profile')}
                        />
                    </View>
                    <View style={styles_default.space}/>
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
                        onPress={() => this.props.navigation.navigate('Chart')}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;

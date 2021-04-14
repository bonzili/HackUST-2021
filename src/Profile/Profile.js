import * as React from 'react';
import {Button, View, Text, SafeAreaView, Alert, AsyncStorage} from 'react-native';
import styles_default from "../styles";

class Profile extends React.Component{
    constructor(props) {
        super(props);
        try {
            const profile_data = require('./profiledata.json');
            this.name = profile_data["name"]
            this.gender = profile_data["gender"]
            this.age = profile_data["age"]
            this.birth_month = profile_data["birth_month"]
            this.birth_date = profile_data["birth_date"]
            this.telnum = profile_data["telnum"]
            this.cloud = profile_data["cloud"]
            this.child = profile_data["child"]
        }
        catch (err){
            this.props.navigation.navigate('Edit Profile')
        }
    }

    componentDidMount() {
        this._retrieveProfileExist();
    }

    _retrieveProfileExist = async () => {
        try {
            const value = await AsyncStorage.getItem('ProfileExist');
            if (value !== null) {
                console.log(value);
            }
            if (value == null){
                this.props.navigation.replace('Edit Profile')
            }
        } catch (error) {
            this.props.navigation.replace('Edit Profile')
        }
    };

    render() {
        return (
            <SafeAreaView style={styles_default.container}>
                <View style={styles_default.header}>
                    <Text style={styles_default.title}>
                        Tales of the Old 老聲長談
                    </Text>
                    <Text style={styles_default.title}>
                        Welcome Back, {}
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
                            onPress={() => navigation.navigate('Profile')}
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
                        onPress={() => navigation.navigate('Chart')}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Profile;

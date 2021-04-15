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
            const value = await AsyncStorage.getItem('profile');
            if (value !== null) {
                console.log(value);
            }
            if (value == null){
                if (value === "False") {
                    this.props.navigation.replace('Edit Profile')
                }
            }
        } catch (error) {
            this.props.navigation.replace('Edit Profile')
        }
    };

    render() {
        return (
            <SafeAreaView style={styles_default.container}>
                <View style={styles_default.horizontal_container}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Just Talk"
                            onPress={() => this.props.navigation.replace('Edit Profile')}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default Profile;

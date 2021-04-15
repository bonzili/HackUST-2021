import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, AsyncStorage} from 'react-native'
import styles_default from "./styles";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JustTalk from "./JustTalk/JustTalk";
import TDML from "./TDML";
import SendAMessage from "./SendAMessage";
import Chart from "./Chart";
import Profile from "./Profile/Profile";
import HomeScreen from "./Home";
import * as Font from 'expo-font';
import Opening from "./Opening";
import EditProfile from "./Profile/Edit Profile";

class AcType extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        }

    }
    async componentDidMount() {
        try {
            await Font.loadAsync({
                Quicksand: require('../assets/fonts/Quicksand-Regular.ttf'),
                QuicksandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
                QuicksandMedium: require('../assets/fonts/Quicksand-Medium.ttf'),
                AbrilFatface: require('../assets/fonts/AbrilFatface.ttf'),
                ElsieSwashCaps: require('../assets/fonts/ElsieSwashCaps-Black.ttf'),
            })
            this.setState({ fontLoaded: true })
        } catch (error) {
            console.log(error)
        } finally {
            this._retrieveData();
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('child');
            if (value !== null) {
                if (value === "True"){
                    this.props.navigation.replace('Opening Page');       //Account Type: Child
                }else if (value === "False"){
                    this.props.navigation.replace('Opening Page')      //Account Type: Elderly
                };
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    _storeData = async (actype) => {
        try {
            await AsyncStorage.setItem(
                'child', actype
            );
        } catch (error) {
            // Error saving data
        }
    };

    render() {
        return (

            <SafeAreaView style={styles_default.container}>
                <View style={styles_default.header}>
                    <Text style={styles_default.title}>
                        Login as:
                    </Text>
                </View>
                <View style={styles_default.horizontal_container}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Child"
                            onPress={() => {this._storeData("True"); this.props.navigation.replace('Home')}}
                        />
                    </View>
                </View>
                <View style={styles_default.horizontal_container}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Elderly"
                            onPress={() => {this._storeData("False"); this.props.navigation.replace('Home')}}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Account Type"
                             screenOptions={{headerStyle: {backgroundColor: '#B01A1A',}, headerTintColor: '#fff',}}>
                <Stack.Screen options={{title: ''}} name= "Account Type" component={AcType} />
                <Stack.Screen options={{title: ''}} name="Home" component={HomeScreen} />
                <Stack.Screen options={{title: ''}} name="Just Talk" component={JustTalk} />
                <Stack.Screen options={{title: ''}} name="Trip Down Memory Lane" component={TDML} />
                <Stack.Screen options={{title: ''}} name="Send a Message" component={SendAMessage} />
                <Stack.Screen options={{title: ''}} name="Chart" component={Chart} />
                <Stack.Screen options={{title: ''}} name="Profile" component={Profile} />
                <Stack.Screen options={{title: ''}} name="Edit Profile" component={EditProfile} />
                <Stack.Screen options={{headerShown: false,title:''}} name="Opening Page" component={Opening} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

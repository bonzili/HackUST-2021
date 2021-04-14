import React from 'react';
import {StyleSheet, View, SafeAreaView, Text, Alert, AsyncStorage} from 'react-native';
import styles_default from "./styles";
import { Button } from "react-native-elements";

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
                <View style={[styles_default.header,{flex:2}]}>
                    <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'QuicksandBold'}]}>
                        Welcome Back,
                    </Text>
                    <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'QuicksandBold'}]}>
                        {name}
                    </Text>
                </View>
                <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Just Talk"
                            onPress={() => this.props.navigation.navigate('Just Talk')}
                            titleStyle={{fontFamily:'QuicksandBold',color: '#011F8C',fontSize:25}}
                            buttonStyle={{paddingVertical:45,borderRadius: 15 ,backgroundColor:'#FF7575'}}
                        />
                    </View>
                    <View style={styles_default.space}/>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title={"Send a Message"}
                            onPress={() => this.props.navigation.navigate('Send a Message')}
                            titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:25}}
                            buttonStyle={{paddingVertical:30,borderRadius: 15 ,backgroundColor:'#FFB800'}}
                        />
                    </View>
                </View>
                <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Trip Down Memory Lane"
                            onPress={() => this.props.navigation.navigate('Trip Down Memory Lane')}
                            titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:20}}
                            buttonStyle={{paddingVertical:30,borderRadius: 15 ,backgroundColor:'#FFE2D6'}}
                        />
                    </View>
                    <View style={styles_default.space}/>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Mood Tracker"
                            onPress={() => this.props.navigation.navigate('Opening Page')}
                            titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:20}}
                            buttonStyle={{paddingVertical:40,borderRadius: 15 ,backgroundColor:'#FF8654'}}
                        />
                    </View>
                </View>
                <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Edit Profile"
                            onPress={() => this.props.navigation.navigate('Profile')}
                            titleStyle={{fontFamily:'QuicksandBold',color: '#7DD8FF',fontSize:20}}
                            buttonStyle={{paddingVertical:40,borderRadius: 15 ,backgroundColor:'#237CA1'}}
                        />
                    </View>
                    <View style={styles_default.space}/>
                    <View style={styles_default.buttonContainer}>
                        <Button
                            title="Add Contact"
                            onPress={() => Alert.alert('Right button pressed')}
                            titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:20}}
                            buttonStyle={{paddingVertical:40,borderRadius: 15 ,backgroundColor:'#7DD8FF'}}
                        />
                    </View>
                </View>
                <View style={[styles_default.horizontal_container,{flex:1,marginBottom:10}]}>
                    <Button
                        title="Help"
                        onPress={() => this.props.navigation.navigate('Chart')}
                        titleStyle={{fontFamily:'QuicksandBold',color: '#FFB800',fontSize:20}}
                        buttonStyle={{borderRadius: 15,paddingHorizontal:150,backgroundColor:'#B01A1A'}}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;

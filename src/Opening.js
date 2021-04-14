import * as React from 'react';
import {View, Text, StyleSheet, Alert, SafeAreaView, AsyncStorage, TouchableOpacity,ImageBackground} from 'react-native';
import styles_default from "./styles";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";

let name = "User";

class Opening extends React.Component{
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
                <Button
                    icon={
                        <Icon name="menu" size={30} color="#FFB808" />
                    }
                    type="clear"
                />
                <View style={styles_default.header}>
                    <Text style={[styles_default.title,{fontSize:35, marginVertical: 0}]}>
                        Welcome Back,
                    </Text>
                    <Text style={[styles_default.title,{fontSize:35, marginVertical: 0}]}>
                        {name}
                    </Text>
                </View>
                <View style={[styles_default.horizontal_container, {flex:5}]}>
                    <Button
                        buttonStyle={{ borderWidth: 55 , backgroundColor:'#FF7575', borderColor:'#FF7575', borderRadius: 20}}
                        titleStyle={{ color: "#011F8C" , fontSize:30, fontFamily: "QuicksandMedium"}}
                        title="Let's Talk:)"
                        onPress={() => this.props.navigation.navigate('Just Talk')}
                    />
                </View>
                <View style={styles_default.header}>
                    <Text style={[styles_default.title,{marginVertical: -5, fontFamily: "ElsieSwashCaps",fontSize:35}]}>
                        Memory
                    </Text>
                    <Text style={[styles_default.title,{marginVertical: -5, fontFamily: "ElsieSwashCaps",fontSize:35}]}>
                        by
                    </Text>
                    <Text style={[styles_default.title,{marginVertical: -5, fontFamily: "ElsieSwashCaps",fontSize:35}]}>
                        Memory
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
    },
});
export default Opening;

import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Alert, ScrollView} from 'react-native';
import styles_default from "./styles";
import {Button} from 'react-native-elements'
import {StatusBar} from "expo-status-bar";

const TDML = () => (
    <SafeAreaView style={[styles_default.container,{paddingTop: StatusBar.currentHeight}]}>
        <ScrollView style={styles.scrollView}>
        <View style={[styles_default.header,{flex:2,paddingTop:20}]}>
            <Text style={[styles_default.title,{fontSize:25,marginVertical:0,fontFamily:'AbrilFatface'}]}>
                Trip Down Memory Lane
            </Text>
        </View>
            <View style={styles_default.space}/>
        <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
            <View style={styles_default.buttonContainer}>
                <Button
                    title="Inbox"
                    onPress={() => Alert.alert('To be implemented')}
                    titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:35}}
                    buttonStyle={{paddingVertical:30,borderRadius: 15 ,backgroundColor:'#FF7575'}}
                />
            </View>
        </View>
            <View style={styles_default.space}/>
        <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
            <View style={styles_default.buttonContainer}>
                <Button
                    title="Daily Log"
                    onPress={() => Alert.alert('To be implemented')}
                    titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:35}}
                    buttonStyle={{paddingVertical:30,borderRadius: 15 ,backgroundColor:'#7DD8FF'}}
                />
            </View>
        </View>
            <View style={styles_default.space}/>
        <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
            <View style={styles_default.buttonContainer}>
                <Button
                    title="News"
                    onPress={() => Alert.alert('To be implemented')}
                    titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:35}}
                    buttonStyle={{paddingVertical:30,borderRadius: 15 ,backgroundColor:'#FFD800'}}
                />
            </View>
        </View>
            <View style={styles_default.space}/>
            <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
            <View style={styles_default.buttonContainer}>
            <Button
                title="My Stories"
                onPress={() => Alert.alert('To be implemented')}
                titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:35}}
                buttonStyle={{paddingVertical:30,borderRadius: 15,backgroundColor:'#FFE2D6'}}
            />
            </View>
        </View>
            <View style={styles_default.space}/>
            <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                <View style={styles_default.buttonContainer}>
                <Button
                    title="My Interests"
                    onPress={() => Alert.alert('To be implemented')}
                    titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:30}}
                    buttonStyle={{paddingVertical:30,borderRadius: 15,backgroundColor:'#FF8654'}}
                />
                </View>
            </View>
            <View style={styles_default.space}/>
            <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                <View style={styles_default.buttonContainer}>
                <Button
                    title="Favorites"
                    onPress={() => Alert.alert('To be implemented')}
                    titleStyle={{fontFamily:'QuicksandBold',color: '#237CA1',fontSize:30}}
                    buttonStyle={{paddingVertical:30,borderRadius: 15,backgroundColor:'#B01A1A'}}
                />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20,
    },
});

export default TDML;

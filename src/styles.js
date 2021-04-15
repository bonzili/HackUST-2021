import {Image, StyleSheet, View} from 'react-native';
import React from "react";

const styles_default = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFDE9',
    },
    emptyContainer: {
        alignSelf: "stretch",
        backgroundColor: '#FFFDE9',
    },
    title: {
        fontFamily: 'AbrilFatface',
        textAlign: 'center',
        marginVertical: 8,
        color: '#011F8C',
        fontSize: 25,
    },
    header: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    red_separator: {
        marginVertical: 5,
        marginHorizontal: 20 ,
        width: 130,
        height: 15,
        backgroundColor: '#B01A1A',
        borderRadius: 10
    },
    separator: {
        borderBottomColor: '#B01A1A',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 15,
    },
    space: {
        width: 20,
        height: 20,
    },
    horizontal_container:{
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        borderRadius: 8,
    }
});

export default styles_default;


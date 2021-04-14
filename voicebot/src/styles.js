import {StyleSheet} from "react-native";

const styles_default = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: 25,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: '#011F8C',
    },
    header: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
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
    }
});

export default styles_default;

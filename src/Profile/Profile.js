import * as React from 'react';
import {View, Text, SafeAreaView, Alert, AsyncStorage} from 'react-native';
import styles_default from "../styles";
import {Button} from 'react-native-elements'
class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            gender: "Gender",
            name: "Name",
            age: "Age",
            birth_month: "Month",
            birth_date: "Date",
            telnum: "Phone num",
            profileLoaded: false,
        }
    }

    componentDidMount() {
        this._retrieveProfile();
    }

    _retrieveProfile = async () => {
        try {
            const value = await AsyncStorage.getItem('profile');
            if (value !== null) {
                if (value === "True"){
                    const name = await AsyncStorage.getItem('name');
                    this.state.name = name;
                    const age = await AsyncStorage.getItem('age');
                    this.state.age = age;
                    const gender = await AsyncStorage.getItem('gender');
                    this.state.gender = gender;
                    const birth_date = await AsyncStorage.getItem('birth_date');
                    this.state.birth_date = birth_date;
                    const birth_month = await AsyncStorage.getItem('birth_month');
                    this.state.birth_month = birth_month;
                    const telnum = await AsyncStorage.getItem('telnum');
                    this.state.telnum = telnum;
                }
                if (value === "False"){
                    this.props.navigation.replace('Edit Profile')
                }

            }else{
                this.props.navigation.replace('Edit Profile')
            }
        } catch (error) {
        }finally {
            this.setState({ profileLoaded: true });
        }
    };

    render() {
        if (!this.state.profileLoaded) {
            return <View style={styles_default.emptyContainer} />;
        }else{
            return (
                <SafeAreaView style={[styles_default.container,{justifyContent: 'flex-start'}]}>
                    <View style={[{alignItems:'flex-start',marginLeft:25}]}>
                        <Text style={[styles_default.title,{fontSize:35,alignItems:'flex-start',fontFamily:'AbrilFatface'}]}>
                            {this.state.name}
                        </Text>
                    </View>
                    <View style={styles_default.red_separator}/>
                    <View style={[styles_default.horizontal_container,{flex:1,marginRight:25,marginLeft:25,alignItems: 'flex-start',justifyContent: 'flex-start'}]}>
                        <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'QuicksandBold',color: '#237CA1'}]}>
                            {this.state.gender === "M"? "Male":"Female"}
                        </Text>
                        <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'QuicksandBold',color: '#237CA1'}]}>
                            , Age: {this.state.age}
                        </Text>
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:1,marginRight:20,marginLeft:20}]}>
                        <View style={styles_default.buttonContainer}>
                            <Button
                                title="Edit"
                                onPress={() => {this.props.navigation.replace('Edit Profile')}}
                                titleStyle={{fontFamily:'QuicksandBold',color: '#011F8C',fontSize:20}}
                                buttonStyle={{borderRadius: 15,paddingHorizontal:80,backgroundColor:'#FFB808'}}
                            />
                        </View>
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:1,marginRight:25,marginLeft:25,alignItems: 'flex-start',justifyContent: 'space-between'}]}>
                        <Text style={[styles_default.title,{fontSize:30,marginHorizontal:10,fontFamily:'Quicksand',color: '#237CA1'}]}>
                            {this.state.telnum}
                        </Text>
                        <View style={[styles_default.buttonContainer,{justifyContent: 'flex-end'}]}>
                        <Button
                            title="Share"
                            onPress={() => Alert.alert('To be implemented')}
                            titleStyle={{fontFamily:'QuicksandBold',color: '#011F8C',fontSize:20}}
                            buttonStyle={{borderRadius: 15,paddingHorizontal:50,backgroundColor:'#FF8654'}}
                        />
                        </View>
                    </View>
                    <View style={styles_default.separator}/>
                    <View style={[styles_default.horizontal_container,{flex:1,marginRight:25,marginLeft:25,alignItems: 'flex-start',justifyContent: 'flex-start'}]}>
                        <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'AbrilFatface',color: '#237CA1'}]}>
                            Birthday
                        </Text>
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:1,marginRight:25,marginLeft:25,alignItems: 'flex-start',justifyContent: 'flex-start'}]}>
                        <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'QuicksandBold',color: '#237CA1'}]}>
                            {this.state.birth_date}/
                        </Text>
                        <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'QuicksandBold',color: '#237CA1'}]}>
                            {this.state.birth_month}
                        </Text>
                    </View>
                </SafeAreaView>
            );
        }
    }
}

export default Profile;

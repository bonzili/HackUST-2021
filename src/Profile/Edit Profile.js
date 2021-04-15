import * as React from 'react';
import {View, Text, ScrollView, Alert, SafeAreaView, AsyncStorage, StyleSheet} from 'react-native';
import styles_default from "../styles";
import { Input , ButtonGroup} from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';

class EditProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedIndexAcType: 1,
            name: "",
            age: "",
            birth_month: "",
            birth_date: "",
            telnum: "",
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.updateIndexActype = this.updateIndexActype.bind(this)
        this.refname = React.createRef();
        this.refage = React.createRef();
        this.refbirth_month = React.createRef();
        this.refbirth_date = React.createRef();
        this.reftelnum = React.createRef();
    }

    componentDidMount() {
        this._retrieveProfile();
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
    updateIndexActype (selectedIndexAcType) {
        this.setState({selectedIndexAcType})
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
                    if (gender === "M"){
                        this.state.selectedIndex = 0
                    }else if (gender === "F"){
                        this.state.selectedIndex = 1
                    }
                    const birth_date = await AsyncStorage.getItem('birth_date');
                    this.state.birth_date = birth_date;
                    const birth_month = await AsyncStorage.getItem('birth_month');
                    this.state.birth_month = birth_month;
                    const telnum = await AsyncStorage.getItem('telnum');
                    this.state.telnum = telnum;
                    const child = await AsyncStorage.getItem('child');
                    if (child === "True"){
                        this.state.selectedIndexAcType = 0
                    }else if (child === "False"){
                        this.state.selectedIndexAcType = 1
                    }
                    this.refname.current.setNativeProps({ text: this.state.name });
                    this.refage.current.setNativeProps({ text: this.state.age });
                    this.refbirth_month.current.setNativeProps({ text: this.state.birth_month });
                    this.refbirth_date.current.setNativeProps({ text: this.state.birth_date });
                    this.reftelnum.current.setNativeProps({ text: this.state.telnum });
                }
            }
        } catch (error) {
        }
    };

    _storeProfile = async () => {
        try {
            await AsyncStorage.setItem(
                'name', this.state.name
            );
            if (this.state.selectedIndex === 0){
                await AsyncStorage.setItem(
                    'gender', 'M'
                );
            }else{
                await AsyncStorage.setItem(
                    'gender', 'F'
                );
            }
            await AsyncStorage.setItem(
                'age', this.state.age
            );
            await AsyncStorage.setItem(
                'birth_month', this.state.birth_month
            );
            await AsyncStorage.setItem(
                'birth_date', this.state.birth_date
            );
            await AsyncStorage.setItem(
                'telnum', this.state.telnum
            );
            await AsyncStorage.setItem(
                'profile', "True"
            );
            if (this.state.selectedIndexAcType === 0){
                await AsyncStorage.setItem(
                    'child', 'True'
                );
            }else{
                await AsyncStorage.setItem(
                    'child', 'False'
                );
            }
        } catch (error) {
            // Error saving data
        }
    };

    render() {
        const { selectedIndex } = this.state
        const { selectedIndexAcType } = this.state
        return (
            <SafeAreaView style={[styles_default.container,{paddingTop: StatusBar.currentHeight}]}>
                <ScrollView style={styles.scrollView}>
                    <View style={[styles_default.header,{flex:2,paddingTop:5}]}>
                        <Text style={[styles_default.title,{fontSize:30,marginVertical:0,fontFamily:'AbrilFatface'}]}>
                            Your Profile
                        </Text>
                        <Text style={[styles_default.title,{fontSize:25,marginVertical:0,fontFamily:'AbrilFatface',color:'#237CA1'}]}>
                            Basic Information
                        </Text>
                    </View>
                    <View style = {[styles_default.space,{height: 5}]}></View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <Input
                            ref={this.refname}
                            errorMessage="Please enter a correct name!"
                            leftIcon={<Icon name="user" size={20} />}
                            placeholder="Enter Name"
                            onChangeText={value => this.setState({ name: value })}
                        />
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <Text style={[styles_default.title,{fontSize:25,marginVertical:0,fontFamily:'AbrilFatface',color:'#237CA1'}]}>
                            Gender:
                        </Text>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={['Male', 'Female']}
                            containerStyle={{width:100}}
                        />
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <Input
                            ref={this.refage}
                            errorMessage="Please enter a correct age!"
                            leftIcon={<Icon name="calendar" size={20} />}
                            placeholder="Age"
                            onChangeText={value => this.setState({ age: value })}
                        />
                    </View>
                <Text style={[styles_default.title,{fontSize:25,marginVertical:0,fontFamily:'AbrilFatface',color:'#237CA1'}]}>
                    Birthday:
                </Text>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                            <Input
                                ref={this.refbirth_month}
                                containerStyle={{flex:1}}
                                errorMessage="Please enter a correct month!"
                                leftIcon={<Icon name="birthday-cake" size={20} />}
                                placeholder="Month"
                                onChangeText={value => this.setState({ birth_month: value })}
                            />
                            <Input
                                ref={this.refbirth_date}
                                containerStyle={{flex:1}}
                                errorMessage="Please enter a correct day!"
                                placeholder="Day"
                                onChangeText={value => this.setState({ birth_date: value })}
                            />
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <Input
                            ref={this.reftelnum}
                            errorMessage="Please enter a correct phone number!"
                            leftIcon={<Icon name="phone" size={20} />}
                            placeholder="Phone Number"
                            onChangeText={value => this.setState({ telnum: value })}
                        />
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <Text style={[styles_default.title,{fontSize:20,fontFamily:'AbrilFatface',color:'#237CA1'}]}>
                            Account Type:
                        </Text>
                        <ButtonGroup
                            onPress={this.updateIndexActype}
                            selectedIndex={selectedIndexAcType}
                            buttons={['Child', 'Elderly']}
                            containerStyle={{width:100}}
                        />
                    </View>
                    <View style = {[styles_default.space,{height: 5}]}></View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <View style={styles_default.buttonContainer}>
                            <Button
                                title="Save"
                                onPress={() => {this._storeProfile(); this.props.navigation.replace('Profile')}}
                                titleStyle={{fontFamily:'QuicksandBold',color: '#FFB800',fontSize:20}}
                                buttonStyle={{borderRadius: 15,paddingHorizontal:80,backgroundColor:'#B01A1A'}}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20,
    },
});

export default EditProfile;

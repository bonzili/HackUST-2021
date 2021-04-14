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
        this.ProfileExist = false;
        this.state = {
            selectedGenderIndex: 1,
            selectedAcTypeIndex: 1,
            name: "",
            age: 0,
            birth_month: 0,
            birth_day: 0,
            telnum: 0,
            cloud: 0,
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.updateAcTypeIndex = this.updateAcTypeIndex.bind(this)
    }
    updateIndex (selectedGenderIndex) {
        this.setState({selectedGenderIndex})
    }
    updateAcTypeIndex (selectedAcTypeIndex) {
        this.setState({selectedAcTypeIndex})
    }

    componentDidMount() {
        this._retrieveProfileExist();
        this._retrieveAcType();
    }

    _retrieveProfileExist = async () => {
        try {
            const value = await AsyncStorage.getItem('ProfileExist');
            if (value !== null) {
                this.ProfileExist = true;
            }
        } catch (error) {
            this.ProfileExist = false;
        }
    };

    _retrieveAcType = async () => {
        try {
            const value = await AsyncStorage.getItem('child');
            if (value !== null) {
                if (value) {
                    this.setState({selectedAcTypeIndex: 0})
                } else {
                    this.setState({selectedAcTypeIndex: 1})
                }
            }
        } catch (error) {
        }
    };


    render() {
        const buttons = ['Male', 'Female']
        const { selectedGenderIndex } = this.state
        const buttonsAcType = ['Child', 'Elderly']
        const { selectedAcTypeIndex } = this.state
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
                            selectedIndex={selectedGenderIndex}
                            buttons={buttons}
                            containerStyle={{width:100}}
                        />
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <Input
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
                                containerStyle={{flex:1}}
                                errorMessage="Please enter a correct month!"
                                leftIcon={<Icon name="birthday-cake" size={20} />}
                                placeholder="Month"
                                onChangeText={value => this.setState({ birth_month: value })}
                            />
                            <Input
                                containerStyle={{flex:1}}
                            errorMessage="Please enter a correct day!"
                            placeholder="Day"
                            onChangeText={value => this.setState({ birth_day: value })}
                            />
                    </View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <Input
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
                            onPress={this.updateAcTypeIndex}
                            selectedIndex={selectedAcTypeIndex}
                            buttons={buttonsAcType}
                            containerStyle={{width:100}}
                        />
                    </View>
                    <View style = {[styles_default.space,{height: 5}]}></View>
                    <View style={[styles_default.horizontal_container,{flex:2,marginRight:20,marginLeft:20}]}>
                        <View style={styles_default.buttonContainer}>
                            <Button
                                title="Save"
                                onPress={() => Alert.alert('To be implemented')}
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

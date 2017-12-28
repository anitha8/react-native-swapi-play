import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TouchableOpacity,
    Image,
    Text, Easing, Animated,
} from 'react-native';
import find from "lodash/find";

import UserInput from './UserInput';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg  from '../images/eye_black.png';
import { Actions } from "react-native-router-flux/index";

const SWAPIConfig = {
    baseUrl: 'http://swapi.co/api/',
    planetsEndpoint: 'planets/',
    starshipsEndpoint: 'starships/',
    vehiclesEndpoint: 'vehicles/',
    peopleEndpoint: 'people/',
    filmsEndpoint: 'films/',
    speciesEndpoint: 'species/',
};
var REQUEST_URL = SWAPIConfig.baseUrl + SWAPIConfig.peopleEndpoint;

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
			showPass: true,
			press: false,
            userName:"",
            password:"",
			isLoading: false,
			people:[],
            errorMsg: "",
		};
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
		this.showPass = this.showPass.bind(this);
	}

	showPass() {
  		this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
  	}

    _onPress() {
        if (this.state.userName == "" || this.state.password == "") {
            console.log("username>>>>>>>>>>>>>>>."+this.state.userName)
            this.setState({errorMsg: "Please check your UserName or Password"});
            return;
        }
        this.setState({errorMsg: ""});
        this.fetchData();
        Animated.timing(
            this.buttonAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();

        setTimeout(() => {
            this._onGrow();
        }, 2000);

        setTimeout(() => {
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        }, 2300);
    }

    findItem = () => {
	    let userId;
        find(this.state.people, (singleItem, index) =>
            {
                if (singleItem.name === this.state.userName && singleItem.birth_year === this.state.password) {
                    console.log("selected index>>>>>>>>"+ index);
                    userId = index;
                }
            });
        return userId;
    };

    fetchData() {
        console.log("fetch enter>>>"+ REQUEST_URL);
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    people: responseData.results,
                    isLoading: true
                });
                const index = this.findItem();
                console.log(">>>>>>>>.11111"+index);
                if (index >= 0) {
                    console.log("render searchh screen");
                    Actions.secondScreen();
                }
            })
            .done();
        console.log(">>>>>>"+this.state.people);
    }

    _onGrow() {
        Animated.timing(
            this.growAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

	render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN]
        });

		return (
		    <View style = {styles.container}>
                <KeyboardAvoidingView behavior='padding' style = {styles.container}>
                    <UserInput source={usernameImg}
                        placeholder={'Username'}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        value={this.state.userName}
                        onChangeInput={userName => this.setState({ userName })}/>
                    <View style={styles.new}>
                        <UserInput source={passwordImg}
                            secureTextEntry={this.state.showPass}
                            placeholder={'Password'}
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={this.state.password}
                            onChangeInput={password => this.setState({ password })}/>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.btnEye}
                                onPress={this.showPass}
                            >
                                <Image source={eyeImg} style={styles.iconEye} />
                            </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <Text style={styles.errormsg}>{this.state.errorMsg}</Text>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity style={styles.button}
                                      onPress={this._onPress}
                                      activeOpacity={1} >
                            <Text style={styles.text}>LOGIN</Text>
                    </TouchableOpacity>
                    <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
                </Animated.View>
            </View>
        );
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection:"column",
	},
    errormsg:{
	    color:'red',
        fontSize:16,
        paddingBottom: 80
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
        marginBottom: 90,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN - 90,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0',
        marginBottom: 90,
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
	new: {
		flex:1,
        flexDirection: 'row',
    },
	btnEye: {
		alignItems: "flex-end",
        justifyContent: "flex-start",
		paddingTop:10,
		paddingRight:40,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});

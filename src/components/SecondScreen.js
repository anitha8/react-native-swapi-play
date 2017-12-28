import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Animated,
	Easing,
	Text,
} from 'react-native';
import Dimensions from 'Dimensions';

import { Actions } from 'react-native-router-flux';
import SelectDropDownList from "./SelectDropDownList";
import arrowImg from '../images/left-arrow.png';

const SIZE = 40;
var count = 0;
const SWAPIConfig = {
    baseUrl: 'http://swapi.co/api/',
    planetsEndpoint: 'planets/',
    starshipsEndpoint: 'starships/',
    vehiclesEndpoint: 'vehicles/',
    peopleEndpoint: 'people/',
    filmsEndpoint: 'films/',
    speciesEndpoint: 'species/',
};
var REQUEST_URL = SWAPIConfig.baseUrl + SWAPIConfig.planetsEndpoint;

export default class SecondScreen extends Component {
	constructor() {
		super();

		this.state = {
            isLoading: false,
            selectedItems: [],
            items: [],
            completeData: [],
            completeSelectedData: [],
        };


		this._onPress = this._onPress.bind(this);
		this.growAnimated = new Animated.Value(0);
	}

	componentDidMount(){
        count = 0;
        this.fetchPlanetData();
    }
	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });

		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 300,
				easing: Easing.linear,
			}
		).start();

		setTimeout(() => {
			Actions.pop();
		}, 500);
	}

    onSelectedItemsChange = selectedItems => {
		const { completeData, completeSelectedData } = this.state;
		this.setState({completeSelectedData: completeData[selectedItems]});
		console.log(this.state.completeSelectedData);
        this.setState({ selectedItems });
    };

    fetchPlanetData() {
        console.log("fetch enter>>>"+ REQUEST_URL);
        let planetData = [];
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
            	this.setState({completeData: responseData.results});
            	for(i=0;i<responseData.results.length;i++){
                    console.log("nameeeeeeeeeeeee"+parseInt(responseData.results[i].population, 10));
					let population = parseInt(responseData.results[i].population, 10) || 0;

                    planetData.push({
                        id: i,
                        name: responseData.results[i].name,
                        population: population,
                    })
				}

				planetData.sort((a, b) => parseInt(a.population, 10) < parseInt(b.population, 10));

                for(i=0;i<planetData.length;i++) {
                    let colorVal;

                    if (planetData[i].population > 0) {
                        count = count + 10;
                        planetData[i].colorVal = this.colorLuminance("FF0000", count);
                    } else {
                        planetData[i].colorVal = '#ffffff';
                    }
                }
                    this.setState({
                    items: planetData,
                    isLoading: true
                });
            })
            .done();
        console.log(">>>>>>");
    }


    rgbToHsl(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }

    hslToRgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [r * 255, g * 255, b * 255];
    }

    colorLuminance(rgbcode, percent) {
        var r = parseInt(rgbcode.slice(1, 3), 16),
            g = parseInt(rgbcode.slice(3, 5), 16),
            b = parseInt(rgbcode.slice(5, 7), 16),
            HSL = this.rgbToHsl(r, g, b),
            newBrightness = HSL[2] + HSL[2] * (percent / 100),
            RGB;

        RGB = this.hslToRgb(HSL[0], HSL[1], newBrightness);
        rgbcode = '#'
            + this.convertToTwoDigitHexCodeFromDecimal(RGB[0])
            + this.convertToTwoDigitHexCodeFromDecimal(RGB[1])
            + this.convertToTwoDigitHexCodeFromDecimal(RGB[2]);

        return rgbcode;
    }

    convertToTwoDigitHexCodeFromDecimal(decimal){
        var code = Math.round(decimal).toString(16);

        (code.length > 1) || (code = '0' + code);
        return code;
    }

    _onPress() {
		Actions.pop();
    }
    render() {
        const { items, selectedItems, completeSelectedData } = this.state;

		const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});
		return (
			<View style={styles.container}>
                <SelectDropDownList
                    items={items}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    placeHolderText="Type planet name"
                />
				<Text style={{fontSize: 16, color: '#111',paddingLeft:10, borderWidth:1, borderColor:"#111" }}>
					{completeSelectedData.population + '\n' + completeSelectedData.climate }
				</Text>
                <Animated.View style={{width: DEVICE_WIDTH - MARGIN}}>
					<TouchableOpacity style={styles.button}
									   onPress={this._onPress}
									   activeOpacity={1} >
						<Text style={styles.text}>LOG OUT</Text>
					</TouchableOpacity>
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
	},
	circle: {
		height: SIZE,
		width: SIZE,
		marginTop: -SIZE,
		borderRadius: 100,
		backgroundColor: '#ADD8E6',
	},
	image: {
		width: 24,
		height: 24,
	},
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ADD8E6',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
		marginLeft: 25,
        marginTop: 100,
    },
});
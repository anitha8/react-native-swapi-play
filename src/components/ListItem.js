import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity, StyleSheet,
} from "react-native";

class ListItem extends Component {
    static propTypes = {
        selectedItemFlag: PropTypes.bool,
        onPress: PropTypes.func.isRequired,
        itemText: PropTypes.string.isRequired,
        gradientColor: PropTypes.string
    };

    static defaultProps = {
        selectedItemFlag: false,
        onPress: () => { },
        itemText: "",
        gradientColor: '#FF0000',
    };

    render() {
        const {
            selectedItemFlag,
            onPress,
            itemText,
            gradientColor
        } = this.props;
        return (
            <View>
                <TouchableOpacity
                    onPress={onPress}>
                    <View style={[styles.rowItems, {backgroundColor: gradientColor}]}>
                        <Text
                            style={[
                                styles.disabledMenu,
                                selectedItemFlag ? { color: 'grey' } : { color: 'black' },
                            ]}>
                            {itemText}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    disabledMenu: {
        flex: 1,
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
    },
    rowItems: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        justifyContent:"center"
    },
});

export default ListItem;

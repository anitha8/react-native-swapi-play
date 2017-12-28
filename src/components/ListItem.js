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
            <TouchableOpacity
                disabled={selectedItemFlag}
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
        paddingLeft: 20,
        paddingRight: 20,
    },
});

export default ListItem;

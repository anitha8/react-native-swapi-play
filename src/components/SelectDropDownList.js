/**
 * @flow
 */
import React, { Component } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    FlatList,
    Image, StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import find from "lodash/find";
import get from "lodash/get";
import ListItem from "./ListItem";
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';

class SelectDropDownList extends Component {
    static propTypes = {
        selectedItems: PropTypes.array,
        items: PropTypes.array.isRequired,
        uniqueKey: PropTypes.string,
        onSelectedItemsChange: PropTypes.func.isRequired,
        placeHolderText: PropTypes.string,
        displayKey: PropTypes.string,
        getSelectedItems: PropTypes.func,
    };

    static defaultProps = {
        selectedItems: [],
        items: [],
        uniqueKey: "id",
        onSelectedItemsChange: () => {
        },
        placeHolderText: "Select",
        displayKey: "name",
    };

    constructor(props) {
        super(props);
        this.state = {
            selector: false,
            searchTerm: "",
        };
    }

    findItem = itemKey => {
        const { items, uniqueKey } = this.props;
        return find(items, singleItem => singleItem[uniqueKey] === itemKey) || {};
    };

    onChangeInput = value => {
        this.setState({ searchTerm: value });
    };

    getSelectLabel = () => {
        const {
            placeHolderText,
            selectedItems,
            displayKey,
        } = this.props;

        const item = selectedItems[0];
        const foundItem = this.findItem(item);
        const getItemname = get(foundItem, displayKey);
        return getItemname || placeHolderText;
    };

    toggleSelector = () => {
        this.setState({
            selector: !this.state.selector,
        });
    };

    submitSelection = () => {
        this.setState({ searchTerm: "" });
        this.toggleSelector();
    };

    itemSelected = item => {
        const { uniqueKey, selectedItems } = this.props;
        return !!find(selectedItems, singleItem => item[uniqueKey] === singleItem);
    };

    toggleItem = item => {
        const {
            uniqueKey,
            onSelectedItemsChange,
        } = this.props;

        this.submitSelection();
        onSelectedItemsChange([item[uniqueKey]]);
    };

    getRow = item => {
        const { displayKey } = this.props;
        const selectedItemFlag = this.itemSelected(item);

        return (
            <ListItem
                selectedItemFlag={selectedItemFlag}
                onPress={() => this.toggleItem(item)}
                itemText={item[displayKey]}
                gradientColor={item.colorVal}
            />
        );
    };

    filterItems = searchTerm => {
        const { items, displayKey } = this.props;
        const filteredItems = [];
        items.forEach(item => {
            const parts = searchTerm.trim().split(/[ \-:]+/);
            const regex = new RegExp(`(${parts.join("|")})`, "ig");
            if (regex.test(get(item, displayKey))) {
                filteredItems.push(item);
            }
        });
        return filteredItems;
    };

    renderItems = () => {
        const { items, uniqueKey, selectedItems } = this.props;
        const { searchTerm } = this.state;
        let component = null;
        const renderItems = searchTerm
            ? this.filterItems(searchTerm.trim())
            : items;
        if (renderItems.length) {
            component = (
                <FlatList
                    data={renderItems}
                    extraData={selectedItems}
                    keyExtractor={item => item[uniqueKey]}
                    renderItem={rowData => this.getRow(rowData.item)}
                />
            );
        }
        return component;
    };

    render() {
        const { selector } = this.state;
        const { placeHolderText } = this.props;
        let listStyle = selector ? styles.selectorView : styles.dropdownView;
        let text;
        let items;

        if (selector) {
            text = <TextInput
                onChangeText={this.onChangeInput}
                placeholder={placeHolderText}
                placeholderTextColor={'black'}
                underlineColorAndroid="transparent"
                style={styles.container}
            />;
        } else {
            text = <Text
                style={styles.container}
                >{this.getSelectLabel()}
                </Text>;
        }

        if (selector) {
            items = <View>{this.renderItems()}</View>;
        }

        return (
            <View style={listStyle}>
                {<TouchableWithoutFeedback onPress={this.toggleSelector}>
                    <View style={styles.inputGroup}>
                        {text}
                        <View style={styles.dropdownIcon}>
                            <Image
                                source={selector ? usernameImg : passwordImg}
                                style={styles.indicator}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>}
                {items}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'black',
    },
    indicator: {
        height: 10,
        width: 20,
    },
    dropdownIcon: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    selectedItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: "center",
        height: 40,
    },
    selectedItemText: {
        flex: 1,
        fontSize: 15,
    },
    selectorView: {
        flexDirection: "column",
        marginBottom: 10,
        elevation: 2,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
        backgroundColor: 'white',
        height: 40,
    },
    dropdownView: {
        flexDirection: "column",
        alignItems: "center",
        height: 40,
        marginBottom: 10,
    },
    menuListBox: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export default SelectDropDownList;


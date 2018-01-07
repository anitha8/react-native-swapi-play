import { Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { configure, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import SelectDropDownList from "../src/components/SelectDropDownList";

configure({ adapter: new Adapter() });

describe("Testing SelectDropDownList Component", () => {
    let wrapper;
    const sampleItems = [{
        id: "92iijs7yta",
        name: "Ondo",
    }, {
        id: "a0s0a8ssbsd",
        name: "Ogun",
    }, {
        id: "16hbajsabsd",
        name: "Calabar",
    }, {
        id: "nahs75a5sg",
        name: "Lagos",
    }, {
        id: "667atsas",
        name: "Maiduguri",
    }, {
        id: "hsyasajs",
        name: "Anambra",
    }, {
        id: "djsjudksjd",
        name: "Benue",
    }, {
        id: "sdhyaysdj",
        name: "Kaduna",
    }, {
        id: "suudydjsjd",
        name: "Abuja",
    }];

    const props = {
        items: sampleItems,
        onSelectedItemsChange: jest.fn(),
        selectedItems: sampleItems.djsjudksjd,
        placeHolderText: "Type network name",
    };

    beforeEach(() => {
        wrapper = shallow(<SelectDropDownList {...props} />);
    });

    it("Check SelectDropDownList Snapshot", () => {
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it("should update list expand and shrink flag", () => {
        const render = wrapper.dive();
        render.find(TouchableWithoutFeedback).simulate("press");
        expect(wrapper.state().selector).toBe(true);
        render.find(TouchableWithoutFeedback).simulate("press");
        expect(wrapper.state().selector).toBe(false);
    });

    it("should call renderItems when menu selected", () => {
        const render = wrapper.dive();
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, "renderItems");
        render.find(TouchableWithoutFeedback).simulate("press");
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });

    it("should update searchterm state when menu searched", () => {
        const render = wrapper.dive();
        render.find(TouchableWithoutFeedback).simulate("press");
        wrapper.instance().onChangeInput("Ca");
        expect(wrapper.state().searchTerm).toBe("Ca");
    });

    it("searchTerm reset when menu selected", () => {
        const render = wrapper.dive();
        render.find(TouchableWithoutFeedback).simulate("press");
        expect(wrapper.state().selector).toBe(true);
        wrapper.instance().toggleItem("Calabar");
        expect(wrapper.state().searchTerm).toBe("");
    });

    it("should call onSelectedItemsChange on item change", () => {
        const render = wrapper.dive();
        render.find(TouchableWithoutFeedback).simulate("press");
        expect(wrapper.state().selector).toBe(true);
        wrapper.instance().toggleItem("Calabar");
        expect(props.onSelectedItemsChange).toBeCalled();
    });

    it("check placeHolderText same as props", () => {
        const render = wrapper.dive();
        const text = render.find(Text).props().children;
        expect(text).toBe(props.placeHolderText);
    });
});

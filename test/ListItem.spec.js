import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { configure, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import ListItem from "../src/components/ListItem";

configure({ adapter: new Adapter() });

describe("Testing SelectDropDownList Component", () => {
    let wrapper;
    const props = {
        selectedItemFlag: false,
        onPress: jest.fn(),
        itemText: "Abuja",
    };

    beforeEach(() => {
        wrapper = shallow(<ListItem {...props} />);
    });

    it("Check ListItem Snapshot", () => {
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it("should call onPress on item select", () => {
        const render = wrapper.dive();
        render.find(TouchableOpacity).simulate("press");
        expect(props.onPress).toBeCalled();
    });

    it("check itemText same as props", () => {
        const render = wrapper.dive();
        const text = render.find(Text).first().props().children;
        expect(text).toBe(props.itemText);
    });

    it("check selectedItemFlag toggle same as props", () => {
        const render = wrapper.dive();
        const text = render.find(TouchableOpacity);
        wrapper.setProps({ selectedItemFlag: true });
        const render1 = wrapper.dive();
        const text1 = render1.find(TouchableOpacity);
    });
});

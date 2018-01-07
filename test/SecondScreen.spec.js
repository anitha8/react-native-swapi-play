import 'react-native';
import React from 'react';
import SecondScreen from '../src/components/SecondScreen';
import SelectDropDownList from "../src/components/SelectDropDownList";

import {configure, shallow} from "enzyme/build/index";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Testing SelectDropDownList Component", () => {

    beforeEach(() => {
        wrapper = shallow(<SecondScreen/>);
    });

    it("Check SelectDropDownList Snapshot", () => {
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it("check planet search visiable", () => {
        wrapper = shallow(<SecondScreen/>);
        const render = wrapper.dive();
        expect(render.find(SelectDropDownList).length).toBe(1);
    });
});
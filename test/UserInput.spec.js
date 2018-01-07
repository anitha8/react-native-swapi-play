import 'react-native';
import React from 'react';
import UserInput from '../src/components/UserInput';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <UserInput />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
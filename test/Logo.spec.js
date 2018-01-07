import 'react-native';
import React from 'react';
import Logo from '../src/components/Logo';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Logo />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
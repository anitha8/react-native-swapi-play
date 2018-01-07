import 'react-native';
import React from 'react';
import Main from '../src/components/Main';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Main />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
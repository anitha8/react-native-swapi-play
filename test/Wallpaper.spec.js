import 'react-native';
import React from 'react';
import Wallpaper from '../src/components/Wallpaper';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Wallpaper />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
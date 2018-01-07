import 'react-native';
import React from 'react';
import Form from '../src/components/Form';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Form />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
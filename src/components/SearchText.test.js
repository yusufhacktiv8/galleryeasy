import React from 'react';
import renderer from 'react-test-renderer';
import SearchText from './SearchText';

test('SearchText correctly rendered', () => {
  const component = renderer.create(
    <SearchText />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

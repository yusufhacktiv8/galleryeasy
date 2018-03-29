import React from 'react';
import TagImage from './TagImage';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

test('Default TagImage correctly rendered', () => {
  const component = renderer.create(
    <TagImage />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Transparent TagImage correctly rendered', () => {
  const component = renderer.create(
    <TagImage transparent />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TagImage onClick called when clicked', () => {
  const callback = sinon.spy();
  const component = renderer.create(
    <TagImage onClick={callback} />,
  );
  let tree = component.toJSON();
  tree.props.onClick();
  
  expect(callback.called).toBe(true);
});

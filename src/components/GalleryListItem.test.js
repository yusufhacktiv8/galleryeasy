import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';

import GalleryListItem from './GalleryListItem';
import TagImage from './TagImage';

test('Default GalleryListItem correctly rendered', () => {
  const component = renderer.create(
    <GalleryListItem url="/test.png" />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Not favourited GalleryListItem render transparent tag image when hovered', () => {
  const component = renderer.create(
    <GalleryListItem url="/test.png" />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onMouseEnter();
  
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Not favourited GalleryListItem remove transparent tag image when mouse out', () => {
  const component = renderer.create(
    <GalleryListItem url="/test.png" />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onMouseEnter();
  
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
  tree.props.onMouseOut();
  
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Favourited GalleryListItem correctly rendered', () => {
  const component = renderer.create(
    <GalleryListItem url="/test.png" favourited />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Favourited GalleryListItem render tag image when hovered', () => {
  const component = renderer.create(
    <GalleryListItem url="/test.png" favourited />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onMouseEnter();
  
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Favourited GalleryListItem still render tag image when mouse out', () => {
  const component = renderer.create(
    <GalleryListItem url="/test.png" favourited />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onMouseEnter();
  
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
  tree.props.onMouseOut();
  
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Not favourited GalleryListItem trigger onFavouriteClick when TagImage clicked', () => {
  const callback = sinon.spy();
  const favourited = false;
  const element = mount(<GalleryListItem url="/test.png" onFavouriteClicked={callback} />);
  element.simulate('mouseEnter');
  element.find(TagImage).simulate('click');
  
  expect(callback.calledWith(favourited)).toBe(true);
});

test('Favourited GalleryListItem trigger onFavouriteClick when TagImage clicked', () => {
  const callback = sinon.spy();
  const favourited = true;
  const element = mount(<GalleryListItem favourited url="/test.png" onFavouriteClicked={callback} />);
  
  element.find(TagImage).simulate('click');
  expect(callback.calledWith(favourited)).toBe(true);
  
  element.simulate('mouseEnter');
  
  element.find(TagImage).simulate('click');
  expect(callback.calledWith(favourited)).toBe(true);
});

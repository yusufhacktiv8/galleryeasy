import React from 'react';
import GalleryListItem from './GalleryListItem';
import renderer from 'react-test-renderer';

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

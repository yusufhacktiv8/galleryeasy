import React from 'react';
import renderer from 'react-test-renderer';
import GalleryList from './GalleryList';

test('GalleryList correctly rendered', () => {
  const items = [
    {
      id: 1,
      url: '/test1.png',
      favourited: true,
    },
    {
      id: 2,
      url: '/test2.png',
      favourited: false,
    },
  ];
  const component = renderer.create(
    <GalleryList items={items} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import GalleryList from './GalleryList';
import GalleryListItem from './GalleryListItem';
import TagImage from './TagImage';

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

test('GalleryList trigger onItemFavouriteClicked when GalleryListItem TagImage clicked', () => {
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
  const callback = sinon.spy();
  const favourited = true;
  const element = mount(<GalleryList items={items} onItemFavouriteClicked={callback} />);
  
  element.find(GalleryListItem).first().find(TagImage).simulate('click');
  expect(callback.calledWith(1, favourited)).toBe(true);
});

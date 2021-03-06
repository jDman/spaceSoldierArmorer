import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import Button from './Button';

describe('<Button />', () => {
  it('should render with all props included', () => {
    const props = {
      type: 'button',
      buttonText: 'test button',
      classes: ['test', 'classes'],
      disabled: false,
      loading: false,
      clickHandler: () => {},
    };
    const component = renderer.create(
      <Button
        type={props.type}
        classes={props.classes}
        disabled={props.disabled}
        loading={props.loading}
        clickHandler={props.clickHandler}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without unnecessary props', () => {
    const props = {
      clickHandler: () => {},
    };
    const component = renderer.create(
      <Button clickHandler={props.clickHandler} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call clickHandler passed by props when clicked', () => {
    const clickHandler = jest.fn();
    const component = renderer.create(<Button clickHandler={clickHandler} />);

    act(() => {
      component.root.findByType('button').props.onClick();
    });

    expect(clickHandler.mock.calls.length).toBe(1);
  });
});

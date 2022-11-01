import React, { MouseEventHandler, useCallback, useReducer } from 'react';
import { getPosition } from '../lib/get-position';

const initialState = { x: 0, y: 0 };

type UpdatePositionAction = {
  type: 'updatePosition';
  payload: Partial<typeof initialState>;
};

const reducer = (state = initialState, action: UpdatePositionAction) => {
  if (action.type === 'updatePosition') {
    return { ...state, ...action.payload };
  }

  return state;
};

export const withMouseMove =
  <T extends {}>(Component: React.ComponentType<MousePosition>) =>
  (props: Omit<T, keyof MousePosition>) => {
    const [{ x, y }, dispatch] = useReducer(reducer, initialState);

    const updatePosition = useCallback<MouseEventHandler>(
      (event) =>
        dispatch({ type: 'updatePosition', payload: getPosition(event) }),
      [dispatch],
    );

    return (
      <div className="h-full w-full" onMouseMove={updatePosition}>
        <Component {...(props as T)} x={x} y={y} />
      </div>
    );
  };

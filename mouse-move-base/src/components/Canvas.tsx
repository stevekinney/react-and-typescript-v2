import React, { MouseEventHandler, useCallback, useReducer } from 'react';
import { getPosition } from '../lib/get-position';

const initialState = { x: 0, y: 0 };

type UpdatePositionAction = {
  type: 'updatePosition';
  payload: Partial<typeof initialState>;
};

type ClearPositionAction = {
  type: 'clearPosition';
};

const reducer = (
  state = { x: 0, y: 0 },
  action: UpdatePositionAction | ClearPositionAction,
) => {
  if (action.type === 'updatePosition') {
    return { ...state, ...action.payload };
  }

  if (action.type === 'clearPosition') {
    return { ...state, x: 0, y: 0 };
  }

  return state;
};

type CanvasProps = { x: number; y: number; id: string };

type MousePosition = { x: number; y: number };

export const withMousePosition = <T extends MousePosition>(
  Component: React.ComponentType<T>,
) => {
  return (props: Omit<T, keyof MousePosition>) => {
    const [{ x, y }, dispatch] = useReducer(reducer, initialState);

    const updatePosition = useCallback<MouseEventHandler>(
      (event) =>
        dispatch({ type: 'updatePosition', payload: getPosition(event) }),
      [dispatch],
    );

    return (
      <div className="w-full h-full" onMouseMove={updatePosition}>
        <Component {...(props as T)} x={x} y={y} foo="bar" />
      </div>
    );
  };
};

export const Canvas = ({ x, y, id }: CanvasProps) => {
  return (
    <div id={id} className="relative w-full h-full bg-primary-700">
      <section className="absolute right-0 p-4 text-right bg-primary-200">
        <p>
          <span className="font-bold">X</span>: {x}
        </p>
        <p>
          <span className="font-bold">Y</span>: {y}
        </p>
      </section>
    </div>
  );
};

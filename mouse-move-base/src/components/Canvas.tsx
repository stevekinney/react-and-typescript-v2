import { MouseEventHandler, useCallback, useReducer } from 'react';
import { getPosition } from '../lib/get-position';

const initialState = { x: 0, y: 0 };

type UpdatePositionAction = {
  type: 'updatePosition';
  payload: Partial<typeof initialState>;
};

const reducer = (state = { x: 0, y: 0 }, action: UpdatePositionAction) => {
  if (action.type === 'updatePosition') {
    return { ...state, ...action.payload };
  }

  return state;
};

export const Canvas = () => {
  const [{ x, y }, dispatch] = useReducer(reducer, initialState);

  const updatePosition = useCallback<MouseEventHandler>(
    (event) =>
      dispatch({ type: 'updatePosition', payload: getPosition(event) }),
    [dispatch],
  );

  return (
    <div
      className="relative h-full w-full bg-primary-700"
      onMouseMove={updatePosition}
    >
      <section className="absolute right-0 bg-primary-200 p-4 text-right">
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

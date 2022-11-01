import { useCallback, useEffect, useReducer, useRef } from 'react';
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

export const useMouseMove = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [{ x, y }, dispatch] = useReducer(reducer, initialState);

  const updatePosition = useCallback<(event: MouseEvent) => void>(
    (event) =>
      dispatch({ type: 'updatePosition', payload: getPosition(event) }),
    [dispatch],
  );

  useEffect(() => {
    const element = ref?.current;

    element?.addEventListener('mousemove', updatePosition);

    return () => {
      element?.removeEventListener('mousemove', updatePosition);
    };
  }, [updatePosition]);

  return { x, y, ref };
};

import React from 'react';

export const getPosition = (event: MouseEvent | React.MouseEvent) => {
  if (!event || event.target === null) return { x: undefined, y: undefined };

  const target = event.target as HTMLElement;

  let x = event.clientX - target.offsetLeft;
  let y = event.clientY - target.offsetTop;

  if (x < 0) x = 0;
  if (y < 0) y = 0;

  if (x > target.offsetWidth) x = target.offsetWidth;
  if (y > target.offsetHeight) x = target.offsetHeight;

  return { x, y };
};

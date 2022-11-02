import React, { useState } from 'react';
import { Canvas, withMousePosition } from './Canvas';

const CanvasWithMousePosition = withMousePosition(Canvas);

const Application = () => {
  const [visible, setVisible] = useState(true);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full gap-4">
      <nav className="flex gap-2 p-2 border-2 border-primary-400">
        <input
          type="checkbox"
          id="visibility-toggle"
          checked={visible}
          onChange={(event) => setVisible(event.target.checked)}
        />
        <label htmlFor="visibility-toggle">Show Canvas</label>
      </nav>
      <section className="w-5/6 h-5/6">
        <CanvasWithMousePosition id="my-id" />
      </section>
    </main>
  );
};

export default Application;

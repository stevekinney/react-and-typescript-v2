import React, { useState } from 'react';
import { Canvas } from './Canvas';

const Application = () => {
  const [visible, setVisible] = useState(true);

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-4">
      <nav className="flex gap-2 border-2 border-primary-400 p-2">
        <input
          type="checkbox"
          id="visibility-toggle"
          checked={visible}
          onChange={(event) => setVisible(event.target.checked)}
        />
        <label htmlFor="visibility-toggle">Show Canvas</label>
      </nav>
      <section className="h-5/6 w-5/6">
        <Canvas />
      </section>
    </main>
  );
};

export default Application;

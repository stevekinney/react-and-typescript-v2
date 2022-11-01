import { Canvas } from './Canvas';
import { MouseMove } from './MouseMove';

const Application = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full gap-4">
      <section className="w-5/6 h-5/6">
        <MouseMove render={({ x, y }) => <Canvas x={x} y={y} />} />
      </section>
    </main>
  );
};

export default Application;

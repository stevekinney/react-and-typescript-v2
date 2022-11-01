import { Canvas } from './Canvas';

const Application = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full gap-4">
      <section className="w-5/6 h-5/6">
        <Canvas />
      </section>
    </main>
  );
};

export default Application;

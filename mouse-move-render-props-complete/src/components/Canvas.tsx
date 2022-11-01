export const Canvas = ({ x, y }: { x: number; y: number }) => {
  return (
    <div className="relative h-full w-full bg-primary-700">
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

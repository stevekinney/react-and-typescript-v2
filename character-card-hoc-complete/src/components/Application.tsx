import { CardWithCharacterInformation } from './withCharacter';

const Application = () => {
  return (
    <main className="flex h-full items-center justify-around bg-primary-200 p-24">
      <CardWithCharacterInformation id={1} />
      <CardWithCharacterInformation id={2} />
      <CardWithCharacterInformation id={3} />
    </main>
  );
};

export default Application;

type AttributeProps = {
  heading: Capitalize<keyof CharacterType>;
  value: CharacterType[keyof CharacterType];
};

const Attribute = ({ heading, value }: AttributeProps) => (
  <tr>
    <th className="text-left">{heading}</th>
    <td>{value}</td>
  </tr>
);

type CharacterProps = {
  character: CharacterType;
  id?: number;
};

export const CharacterCard = ({ character }: CharacterProps): JSX.Element => {
  return (
    <article className="p-8 bg-white border-4 w-60 border-primary-600 shadow-primary-900">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center border-b-4 border-primary-400">
          {character.name}
        </h1>
      </header>
      <table className="w-full">
        <tbody>
          <Attribute heading="Alignment" value={character.alignment} />
          <Attribute heading="Intelligence" value={character.intelligence} />
          <Attribute heading="Strength" value={character.strength} />
          <Attribute heading="Speed" value={character.speed} />
          <Attribute heading="Durability" value={character.durability} />
          <Attribute heading="Power" value={character.power} />
          <Attribute heading="Combat" value={character.combat} />
          <Attribute heading="Total" value={character.total} />
        </tbody>
      </table>
    </article>
  );
};

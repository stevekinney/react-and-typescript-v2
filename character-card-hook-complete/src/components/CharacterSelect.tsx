import { useId } from 'react';

type CharacterSelectProps = {
  characters: CharacterType[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const CharacterSelect = ({
  characters,
  onChange,
}: CharacterSelectProps) => {
  const id = useId();

  return (
    <section className="flex flex-col items-center">
      <label className="block mb-4 font-bold" htmlFor={id}>
        Select a character
      </label>
      <select
        onChange={onChange}
        id={id}
        disabled={!characters.length}
        className="w-full"
      >
        {characters.length ? (
          characters.map((character, index) => (
            <option key={index} value={index}>
              {character.name}
            </option>
          ))
        ) : (
          <option>Loading…</option>
        )}
      </select>
    </section>
  );
};

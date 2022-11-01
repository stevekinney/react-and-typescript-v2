import { useId } from 'react';

type CharacterSelectProps = React.ComponentPropsWithoutRef<'select'> & {
  characters: CharacterType[];
};

export const CharacterSelect = ({
  characters,
  onChange,
}: CharacterSelectProps) => {
  const id = useId();

  return (
    <section className="flex flex-col items-center">
      <label className="mb-4 block font-bold" htmlFor={id}>
        Select a character
      </label>
      <select onChange={onChange} id={id} disabled={!characters.length}>
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

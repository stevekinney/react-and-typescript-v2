import { useId, ComponentPropsWithoutRef } from 'react';

type CharacterSelectProps = ComponentPropsWithoutRef<'select'> & {
  characters: CharacterType[];
};

export const CharacterSelect = ({
  characters,
  ...props
}: CharacterSelectProps): JSX.Element => {
  const id = useId();

  return (
    <section className="flex flex-col items-center">
      <label className="block mb-4 font-bold" htmlFor={id}>
        Select a character
      </label>
      <select {...props} id={id} disabled={!characters.length}>
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

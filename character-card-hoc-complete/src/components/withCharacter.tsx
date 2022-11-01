import { ComponentType, useEffect, useState } from 'react';
import { fetchRandomCharacter } from '../lib/characters';
import { CharacterCard } from './CharacterCard';
import { Loading } from './Loading';

type WithCharacterProps = {
  character: CharacterType;
};

export const withCharacter =
  <T extends WithCharacterProps>(Component: ComponentType<T>) =>
  (props: Omit<T, keyof WithCharacterProps>): JSX.Element => {
    const [character, setCharacter] = useState<CharacterType | null>(null);
    const [loading, setLoading] = useState(true);

    const characters = fetchRandomCharacter();

    useEffect(() => {
      characters.then((c) => {
        setCharacter(c);
        setLoading(false);
      });
    }, []);

    useEffect(() => {
      characters.then((c) => {
        setCharacter(c);
        setLoading(false);
      });
    }, []);

    if (loading) return <Loading />;
    if (!character) return <p>There was an error.</p>;

    return <Component {...(props as T)} character={character} />;
  };

export const CardWithCharacterInformation = withCharacter(CharacterCard);

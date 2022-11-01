import { useEffect, useState } from 'react';
import { fetchRandomCharacter } from '../lib/characters';
import { CharacterCard } from './CharacterCard';
import { Loading } from './Loading';

const characters = fetchRandomCharacter();

const Application = () => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    characters.then((c) => {
      setCharacter(c);
      setLoading(false);
    });
  }, []);

  return (
    <main className="flex h-full items-center justify-around bg-primary-200 p-24">
      {loading && <Loading />}
      {character && <CharacterCard character={character} />}
    </main>
  );
};

export default Application;

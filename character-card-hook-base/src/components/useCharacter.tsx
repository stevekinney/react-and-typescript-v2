import { fetchCharacter } from '../lib/characters';
import { useEffect, useState } from 'react';

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<CharacterType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCharacter(id)
      .then(setCharacter)
      .then(() => setLoading(false));
  }, [id]);

  return [character, loading] as const;
};

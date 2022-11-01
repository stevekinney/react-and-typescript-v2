import { fetchCharacter } from '../lib/characters';
import { useEffect, useMemo, useState } from 'react';

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCharacter(id)
      .then(setCharacter)
      .then(() => setLoading(false));
  }, [id]);

  return useMemo(() => [character, loading] as const, [character, loading]);
};

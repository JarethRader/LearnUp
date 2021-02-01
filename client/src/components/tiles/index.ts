import {
  consonants,
  consonantTeams,
  frontPrefixes,
  finalSpellings,
  finalSpellingsDouble,
  rFamily,
  shortVowels,
  diphthongs,
  walkers,
  suffixes,
} from './frontBoardTiles';

import { roots, backPrefixes } from './backBoardTiles';

export {};

declare global {
  type tileColor = 'bg-white' | 'bg-green-600' | 'bg-yellow-300' | 'bg-red-600';
  interface ITile {
    letters: string;
    color: tileColor;
  }
}

const tiles = Object.freeze({
  consonants,
  consonantTeams,
  frontPrefixes,
  finalSpellings,
  finalSpellingsDouble,
  rFamily,
  shortVowels,
  diphthongs,
  walkers,
  suffixes,
  roots,
  backPrefixes,
});

export default tiles;
export {
  consonants,
  consonantTeams,
  frontPrefixes,
  finalSpellings,
  finalSpellingsDouble,
  rFamily,
  shortVowels,
  diphthongs,
  walkers,
  suffixes,
  roots,
  backPrefixes,
};

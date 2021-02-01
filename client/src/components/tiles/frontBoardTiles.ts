const consonants: ITile[] = [
  {
    letters: 'b',
    color: 'bg-white',
  },
  {
    letters: 'c',
    color: 'bg-white',
  },
  {
    letters: 'd',
    color: 'bg-white',
  },
  {
    letters: 'f',
    color: 'bg-white',
  },
  {
    letters: 'ph',
    color: 'bg-white',
  },
  {
    letters: 'g',
    color: 'bg-white',
  },
  {
    letters: 'h',
    color: 'bg-white',
  },
  {
    letters: 'j',
    color: 'bg-white',
  },
  {
    letters: 'k',
    color: 'bg-white',
  },
  {
    letters: 'l',
    color: 'bg-white',
  },
  {
    letters: 'm',
    color: 'bg-white',
  },
  {
    letters: 'n',
    color: 'bg-white',
  },
  {
    letters: 'kn',
    color: 'bg-white',
  },
  {
    letters: 'p',
    color: 'bg-white',
  },
  {
    letters: 'r',
    color: 'bg-white',
  },
  {
    letters: 'wr',
    color: 'bg-white',
  },
  {
    letters: 's',
    color: 'bg-white',
  },
  {
    letters: 't',
    color: 'bg-white',
  },
  {
    letters: 'v',
    color: 'bg-white',
  },
  {
    letters: 'w',
    color: 'bg-white',
  },
  {
    letters: 'x',
    color: 'bg-white',
  },
  {
    letters: 'y',
    color: 'bg-white',
  },
  {
    letters: 'z',
    color: 'bg-white',
  },
];

const consonantTeams: ITile[] = [
  {
    letters: 'ch',
    color: 'bg-white',
  },
  {
    letters: 'sh',
    color: 'bg-white',
  },
  {
    letters: 'th',
    color: 'bg-white',
  },
  {
    letters: 'wh',
    color: 'bg-white',
  },
  {
    letters: 'qu',
    color: 'bg-white',
  },
  {
    letters: 'ng',
    color: 'bg-white',
  },
  {
    letters: 'nk',
    color: 'bg-white',
  },
];

const frontPrefixes: ITile[] = [
  {
    letters: 'un',
    color: 'bg-white',
  },
  {
    letters: 're',
    color: 'bg-white',
  },
  {
    letters: 'in',
    color: 'bg-white',
  },
  {
    letters: 'dis',
    color: 'bg-white',
  },
];

const finalSpellings: ITile[] = [
  {
    letters: 'f',
    color: 'bg-white',
  },
  {
    letters: 'l',
    color: 'bg-white',
  },
  {
    letters: 's',
    color: 'bg-white',
  },
  {
    letters: 'k',
    color: 'bg-white',
  },
  {
    letters: 'ch',
    color: 'bg-white',
  },
  {
    letters: 'ge',
    color: 'bg-white',
  },
];

const finalSpellingsDouble: ITile[] = [
  {
    letters: 'ff',
    color: 'bg-white',
  },
  {
    letters: 'll',
    color: 'bg-white',
  },
  {
    letters: 'ss',
    color: 'bg-white',
  },
  {
    letters: 'ck',
    color: 'bg-white',
  },
  {
    letters: 'tch',
    color: 'bg-white',
  },
  {
    letters: 'dge',
    color: 'bg-white',
  },
];

const rFamily: ITile[] = [
  {
    letters: 'or',
    color: 'bg-green-600',
  },
  {
    letters: 'ar',
    color: 'bg-green-600',
  },
  {
    letters: 'ur',
    color: 'bg-green-600',
  },
  {
    letters: 'ir',
    color: 'bg-green-600',
  },
  {
    letters: 'er',
    color: 'bg-green-600',
  },
];

const shortVowels: ITile[] = [
  {
    letters: 'i',
    color: 'bg-green-600',
  },
  {
    letters: 'e',
    color: 'bg-green-600',
  },
  {
    letters: 'a',
    color: 'bg-green-600',
  },
  {
    letters: 'u',
    color: 'bg-green-600',
  },
  {
    letters: 'o',
    color: 'bg-green-600',
  },
];

const diphthongs: ITile[] = [
  {
    letters: 'oy',
    color: 'bg-green-600',
  },
  {
    letters: 'oi',
    color: 'bg-green-600',
  },
  {
    letters: 'ou',
    color: 'bg-yellow-400',
  },
  {
    letters: 'ow',
    color: 'bg-yellow-400',
  },
  {
    letters: 'oo',
    color: 'bg-green-600',
  },
  {
    letters: 'au',
    color: 'bg-green-600',
  },
  {
    letters: 'aw',
    color: 'bg-green-600',
  },
];

const walkers: ITile[] = [
  {
    letters: 'ee',
    color: 'bg-green-600',
  },
  {
    letters: 'ai',
    color: 'bg-green-600',
  },
  {
    letters: 'ay',
    color: 'bg-green-600',
  },
  {
    letters: 'oa',
    color: 'bg-green-600',
  },
  {
    letters: 'oe',
    color: 'bg-green-600',
  },
  {
    letters: 'ue',
    color: 'bg-green-600',
  },
  {
    letters: 'ui',
    color: 'bg-green-600',
  },
  {
    letters: 'ie',
    color: 'bg-red-600',
  },
  {
    letters: 'ew',
    color: 'bg-red-600',
  },
  {
    letters: 'eu',
    color: 'bg-red-600',
  },
  {
    letters: 'eigh',
    color: 'bg-red-600',
  },
  {
    letters: 'ey',
    color: 'bg-red-600',
  },
  {
    letters: 'ei',
    color: 'bg-red-600',
  },
  {
    letters: 'ea',
    color: 'bg-yellow-400',
  },
  {
    letters: 'igh',
    color: 'bg-yellow-400',
  },
  {
    letters: 'y',
    color: 'bg-yellow-400',
  },
];

const suffixes: ITile[] = [
  {
    letters: 's',
    color: 'bg-white',
  },
  {
    letters: 'es',
    color: 'bg-white',
  },
  {
    letters: 'ing',
    color: 'bg-white',
  },
  {
    letters: 'ed',
    color: 'bg-white',
  },
  {
    letters: 'er',
    color: 'bg-white',
  },
  {
    letters: 'est',
    color: 'bg-white',
  },
  {
    letters: 'en',
    color: 'bg-white',
  },
  {
    letters: 'y',
    color: 'bg-white',
  },
  {
    letters: 'ful',
    color: 'bg-white',
  },
  {
    letters: 'ly',
    color: 'bg-white',
  },
  {
    letters: 'less',
    color: 'bg-white',
  },
  {
    letters: 'ness',
    color: 'bg-white',
  },
  {
    letters: 'ment',
    color: 'bg-white',
  },
];

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
};

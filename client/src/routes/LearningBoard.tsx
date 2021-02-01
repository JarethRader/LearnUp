import React from 'react';

import tiles from '../components/tiles';

import { Sound, Erase } from '@styled-icons/entypo';

interface Props {}

const LearningBoard = (props: Props) => {
  const [word, setWord] = React.useState<ITile[]>([]);
  const addLetters = (tile: ITile) => {
    setWord([...word, tile]);
  };

  const handleResetWord = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setWord([]);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-300 py-auto'>
      <div className='w-full h-full flex justify-center items-center flex-col'>
        <div className='w-7/12 flex flex-col'>
          <div className='flex self-center'>
            <h1 className='text-orange-500 font-bold text-5xl'>
              Learning Board
            </h1>
          </div>
          <div>
            <p className='text-xl font-medium flex justify-left'>
              Front of board
            </p>
          </div>
        </div>
        <hr className='my-2' />
        <div
          className=' w-7/12 border-4 border-black rounded-xl bg-gray-100 shadow-xl p-4'
          style={{
            gridTemplateColumns: '10% 10% 60% 5% 15%',
            gridTemplateRows: '7rem 7rem 25rem 10rem',
          }}>
          <div className='grid justify-center' style={{ gridColumn: '1/6' }}>
            <div className='flex flex-row justify-items-start flex-wrap'>
              {tiles.consonants.map((tile) => (
                <TileComponent tile={tile} addLetters={addLetters} />
              ))}
            </div>
            <div className='flex flex-row justify-left flex-wrap'>
              {tiles.consonantTeams.map((tile) => (
                <TileComponent tile={tile} addLetters={addLetters} />
              ))}
            </div>
          </div>
          <div className='w-full pt-8 grid grid-cols-12 h-auto'>
            <div className='grid-start-1 grid-span-1 grid-flow-col'>
              <div className='flex flex-row'>
                <div>
                  {tiles.frontPrefixes.map((tile) => (
                    <TileComponent tile={tile} addLetters={addLetters} />
                  ))}
                </div>
              </div>
            </div>
            <div className='grid col-start-3 col-span-8'>
              <div className='grid grid-rows-3'>
                <div className='grid row-start-1 row-span-1'>
                  <div className='flex flex-row'>
                    <div className='border-4 border-black rounded-xl w-5/6 h-5/6 shadow-2xl bg-white'>
                      <div className='h-full flex items-center'>
                        <div className='flex flex-row'>
                          {word.map((tile) => (
                            <TileDisplay tile={tile} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <div>
                        <button
                          onClick={(e) => handleResetWord(e)}
                          className='bg-blue-600 hover:bg-blue-500 m-1 p-1 rounded'>
                          <Erase width='32' />
                        </button>
                      </div>
                      <div>
                        <button className='bg-orange-600 hover:bg-orange-500 m-1 p-1 rounded'>
                          <Sound width='32' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid row-start-2 row-span-2'>
                  <div className='grid grid-cols-5 pt-8'>
                    <div className='grid cols-start-1 grid-span-1'>
                      <div className='flex flex-row'>
                        <div>
                          {tiles.rFamily.map((tile) => (
                            <TileComponent
                              tile={tile}
                              addLetters={addLetters}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='grid cols-start-2 grid-span-1'>
                      <div className='flex flex-row'>
                        <div>
                          {tiles.shortVowels.map((tile) => (
                            <TileComponent
                              tile={tile}
                              addLetters={addLetters}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='grid col-start-3 col-span-2'>
                      <div>
                        <div className='flex flex-row'>
                          {tiles.diphthongs.slice(0, 4).map((tile) => (
                            <TileComponent
                              tile={tile}
                              addLetters={addLetters}
                            />
                          ))}
                        </div>
                        <div className='flex flex-row justify-around'>
                          {tiles.diphthongs.slice(4, 5).map((tile) => (
                            <TileComponent
                              tile={tile}
                              addLetters={addLetters}
                            />
                          ))}
                        </div>
                        <div className='flex flex-row justify-start px-12'>
                          {tiles.diphthongs
                            .slice(5, tiles.diphthongs.length)
                            .map((tile) => (
                              <TileComponent
                                tile={tile}
                                addLetters={addLetters}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid col-start-11 col-span-1'>
              <div className='flex flex-row items-center'>
                <div>
                  {tiles.finalSpellings.map((tile) => (
                    <TileComponent tile={tile} addLetters={addLetters} />
                  ))}
                </div>
              </div>
            </div>
            <div className='grid col-start-12 col-span-1'>
              <div className='flex flex-row items-center'>
                <div>
                  {tiles.finalSpellingsDouble.map((tile) => (
                    <TileComponent tile={tile} addLetters={addLetters} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='grid grid-rows-3'>
              <div className='grid col-start-1 col-span-2'>
                <div className='flex flex-row justify-center'>
                  {tiles.walkers.map((tile) => (
                    <TileComponent tile={tile} addLetters={addLetters} />
                  ))}
                </div>
              </div>
              <div className='grid row-start-3 row-span-1'>
                <div className='flex flex-row justify-center'>
                  {tiles.suffixes.map((tile) => (
                    <TileComponent tile={tile} addLetters={addLetters} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface tileComponentProps {
  tile: ITile;
  addLetters: (letters: ITile) => void;
}

const TileComponent = (props: tileComponentProps) => {
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.addLetters(props.tile);
  };

  return (
    <div
      className={`px-2 py-1 m-1 text-center border-4 border-black hover:border-purple-500 cursor-pointer rounded-lg text-lg font-semibold shadow-xl focus:outline-none ${props.tile.color}`}>
      <button onClick={(e) => handleOnClick(e)} className='focus:outline-none'>
        <p>{props.tile.letters}</p>
      </button>
    </div>
  );
};

interface tileDisplayProps {
  tile: ITile;
}

const TileDisplay = (props: tileDisplayProps) => {
  return (
    <div
      className={`px-2 py-1 m-1 text-center border-4 border-black hover:border-purple-500 cursor-pointer rounded-lg text-lg font-semibold shadow-xl ${props.tile.color}`}>
      <p>{props.tile.letters}</p>
    </div>
  );
};

export default LearningBoard;

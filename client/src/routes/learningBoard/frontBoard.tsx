import React from 'react';
import { TileComponent, TileDisplay } from './tile';
import { Sound, Erase } from '@styled-icons/entypo';

interface Props {
  tiles: any;
  addLetters: (tile: ITile) => void;
  handleResetWord: (event: React.MouseEvent<HTMLButtonElement>) => void;
  word: ITile[];
}

const FrontBoard = (props: Props) => {
  return (
    <div
      className='h-auto 2xl:w-7/12 xl:10/12 md:w-11/12 border-4 border-black rounded-xl bg-gray-100 shadow-xl p-4'
      style={{
        gridTemplateColumns: '10% 10% 60% 5% 15%',
        gridTemplateRows: '7rem 7rem 25rem 10rem',
      }}>
      <div className='grid justify-center' style={{ gridColumn: '1/6' }}>
        <div className='flex flex-row justify-items-start flex-wrap'>
          {props.tiles.consonants.map((tile: ITile) => (
            <TileComponent tile={tile} addLetters={props.addLetters} />
          ))}
        </div>
        <div className='flex flex-row justify-left flex-wrap'>
          {props.tiles.consonantTeams.map((tile: ITile) => (
            <TileComponent tile={tile} addLetters={props.addLetters} />
          ))}
        </div>
      </div>
      <div className='w-full pt-8 grid grid-cols-12 h-2/3'>
        <div className='grid-start-1 grid-span-1'>
          <div className='flex flex-col h-full py-auto'>
            {props.tiles.frontPrefixes.map((tile: ITile) => (
              <TileComponent tile={tile} addLetters={props.addLetters} />
            ))}
          </div>
        </div>
        <div className='grid col-start-3 col-span-8'>
          <div className='grid grid-rows-3'>
            <div className='grid row-start-1 row-span-1'>
              <div className='flex flex-row'>
                <div className='border-4 border-black rounded-xl w-5/6 h-5/6 shadow-2xl bg-white'>
                  <div className='h-full flex items-center'>
                    <div className='flex flex-row'>
                      {props.word.map((tile) => (
                        <TileDisplay tile={tile} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div>
                    <button
                      onClick={(e) => props.handleResetWord(e)}
                      className='bg-blue-600 hover:bg-blue-500 m-1 p-1 rounded'>
                      <Erase width='32' />
                    </button>
                  </div>
                  <div>
                    <button className='bg-yellow-600 hover:bg-yellow-500 m-1 p-1 rounded'>
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
                      {props.tiles.rFamily.map((tile: ITile, index: number) => (
                        <TileComponent
                          tile={tile}
                          addLetters={props.addLetters}
                          style={index === 0 ? 'ml-6' : `ml-${index * index}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='grid cols-start-2 grid-span-1'>
                  <div className='flex flex-row'>
                    <div>
                      {props.tiles.shortVowels.map(
                        (tile: ITile, index: number) => (
                          <TileComponent
                            tile={tile}
                            addLetters={props.addLetters}
                            style={`ml-${index * index}`}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className='grid col-start-3 col-span-2'>
                  <div>
                    <div className='flex flex-row'>
                      {props.tiles.diphthongs.slice(0, 4).map((tile: ITile) => (
                        <TileComponent
                          tile={tile}
                          addLetters={props.addLetters}
                        />
                      ))}
                    </div>
                    <div className='flex flex-row justify-around'>
                      {props.tiles.diphthongs.slice(4, 5).map((tile: ITile) => (
                        <TileComponent
                          tile={tile}
                          addLetters={props.addLetters}
                        />
                      ))}
                    </div>
                    <div className='flex flex-row justify-start px-12'>
                      {props.tiles.diphthongs
                        .slice(5, props.tiles.diphthongs.length)
                        .map((tile: ITile) => (
                          <TileComponent
                            tile={tile}
                            addLetters={props.addLetters}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-start items-stretch'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full'>
                  <div className='flex flex-row justify-center'>
                    {props.tiles.walkers.slice(0, 6).map((tile: ITile) => (
                      <TileComponent
                        tile={tile}
                        addLetters={props.addLetters}
                      />
                    ))}
                  </div>
                  <div className='flex flex-row xl:justify-around xl:px-20 justify-between lg:px-32 md:px-10'>
                    {props.tiles.walkers.slice(6, 8).map((tile: ITile) => (
                      <TileComponent
                        tile={tile}
                        addLetters={props.addLetters}
                      />
                    ))}
                  </div>
                  <div className='flex flex-row xl:justify-around xl:px-20 justify-between lg:px-32 md:px-10'>
                    {props.tiles.walkers.slice(8, 10).map((tile: ITile) => (
                      <TileComponent
                        tile={tile}
                        addLetters={props.addLetters}
                      />
                    ))}
                  </div>
                  <div className='flex flex-row justify-center'>
                    {props.tiles.walkers
                      .slice(10, props.tiles.walkers.length)
                      .map((tile: ITile) => (
                        <TileComponent
                          tile={tile}
                          addLetters={props.addLetters}
                        />
                      ))}
                  </div>
                </div>
                <div className='flex items-end'>
                  <div className='flex flex-row flex-wrap xl:justify-center justify-start'>
                    {props.tiles.suffixes.map((tile: ITile) => (
                      <TileComponent
                        tile={tile}
                        addLetters={props.addLetters}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid col-start-11 col-span-1'>
          <div className='flex flex-row items-start justify-center'>
            <div>
              {props.tiles.finalSpellings.map((tile: ITile) => (
                <TileComponent tile={tile} addLetters={props.addLetters} />
              ))}
            </div>
          </div>
        </div>
        <div className='grid col-start-12 col-span-1'>
          <div className='flex flex-row flex-wrap items-start   justify-end'>
            <div>
              {props.tiles.finalSpellingsDouble.map((tile: ITile) => (
                <TileComponent tile={tile} addLetters={props.addLetters} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontBoard;

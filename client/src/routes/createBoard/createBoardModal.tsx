import React from 'react';

import { Cross } from '@styled-icons/entypo';

interface Props {
  toggleModal: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>
  ) => void;
}

const CreateBoardModal = (props: Props) => {
  const [boardName, setBoardName] = React.useState('');
  const [shareEmail, setShareEmail] = React.useState('');

  const handleSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // const body = {
    //     boardName,
    //     author: props.userInfo.id,
    //     boardState: []
    // };
  };

  return (
    <div
      // onClick={(e) => props.toggleModal(e)}
      className='absolute w-full h-full flex justify-center items-center'>
      <div className='border-2 border-blue-600 2xl:w-1/4 xl:w-1/2 rounded-lg bg-gray-100 shadow-2xl z-10'>
        <div className='text-center grid grid-cols-10'>
          <h1 className='font-semibold text-lg text-center col-start-2 col-span-8 mt-4'>
            Create a New Learning Board
          </h1>
          <button
            onClick={(e) => props.toggleModal(e)}
            className='col-start-10 col-span-1 focus:outline-none hover:text-gray-600'>
            <Cross width='36' />
          </button>
        </div>
        <hr className='my-2' />
        <div className='px-2 flex justify-center'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              <p>Name this board:</p>
              <input
                type='text'
                placeholder='Board Name'
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className='my-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md rounded'
              />
            </label>
            <label>
              <p>Share this board:</p>
              <input
                type='text'
                placeholder='email'
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className='my-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md rounded'
              />
            </label>
            <hr className='my-2' />
            <div className='py-4'>
              <button
                onClick={(e) => handleSubmit(e)}
                className='bg-blue-500 hover:bg-blue-700 text-white font-semibold stroke px-4 py-2 rounded-lg shadow-lg focus:outline-none'>
                Create Board
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;

import React from 'react';

interface Props {}

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
    <div className='absolute w-full h-full flex justify-center items-center'>
      <div className='border-2 border-blue-600 w-1/4 rounded-lg bg-gray-100 shadow-2xl'>
        <div className='text-center mt-4'>
          <h1 className='font-semibold text-lg'>Create a New Learning Board</h1>
        </div>
        <hr className='my-2' />
        <div className='px-4'>
          <form onSubmit={(e) => handleSubmit(e)}>
            Name this board:
            <input
              type='text'
              placeholder='Board Name'
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className='my-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md rounded'
            />
            <label>
              Share this board:
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

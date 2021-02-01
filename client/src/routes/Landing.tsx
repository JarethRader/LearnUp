import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex justify-center flex-col'>
        {/* Banner */}
        <div className='bg-black w-full flex flex-row items-center justify-between px-12 py-4'>
          <div className='flex flex-row items-center'>
            <a href='https://www.learnupcenters.org/' target='_blank'>
              <img
                src='https://uploads-ssl.webflow.com/5d6ecc49839d60e3c55718f4/5d6ecc49839d60ca74571967_learn%2520up%2520logo%2520web-01-p-500.jpeg'
                style={{ width: '20rem', height: 'auto' }}
              />
            </a>
            <h1 className='px-4 font-bold text-2xl text-white'>
              Phonics Learning Board
            </h1>
          </div>

          <Link to='/login'>
            <button className='text-white px-4 py-2 rounded-md border-2 border-blue-700 text-lg bg-blue-500 hover:bg-blue-700 focus:outline-none'>
              Sign In
            </button>
          </Link>
        </div>
        {/* Body */}
        <div className='flex justify-center text-center py-20 flex-col'>
          <h1 className='text-4xl font-bold text-yellow-500'>Welcome!</h1>
          <p className='text-xl font-semibold'>
            Teaching Struggling Readers to Read at Grade Level and Beyond
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers/index';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  userLoading: state.user.userLoading,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Navbar = (props: Props) => {
  return (
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

      {!props.isAuthenticated && (
        <Link to='/login'>
          <button className='text-white font-semibold stroke px-4 py-2 rounded-md  text-lg bg-blue-500 hover:bg-blue-700 focus:outline-none'>
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
};

export default connector(Navbar);

import React from 'react';
import { Link, Redirect } from 'react-router-dom';

interface props {
  Navbar: (props: any) => JSX.Element;
}

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers/index';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  userInfo: state.user.userInfo,
  userLoading: state.user.userLoading,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & props;

const Dashboard = (props: Props) => {
  if (!props.isAuthenticated) {
    return <Redirect to='/authentication' />;
  } else {
    return (
      <div className='min-h-screen'>
        <div>
          <props.Navbar />
          <div className='flex justify-left mt-20 mx-10'>
            <div className=''>
              <h1 className='font-bold text-2xl'>
                Hello {props.userInfo.username}!
              </h1>
              <h1 className='font-bold text-2xl text-blue-500'>
                Welcome to your LearnUp Dashboard
              </h1>
            </div>
          </div>
          <div className='bg-gray-300 mx-20 my-8 py-8 px-10 rounded-xl border-2 border-black shadow-2xl'>
            <h1 className='font-bold text-xl underline'>
              Your whiteboard. No one else can see this whiteboard, only you can
              make changes to it.
            </h1>
            <div className='py-4'>
              <Link
                to='/whiteboard'
                className='px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white font-semibold stroke shadow-xl focus:outline-none'>
                View your whiteboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connector(Dashboard);

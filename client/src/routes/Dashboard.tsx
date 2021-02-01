import React from 'react';

const userInfo = {
  username: 'Jareth',
  email: 'jarp@mail.com',
};

interface Props {
  Navbar: (props: any) => JSX.Element;
}

const Dashboard = (props: Props) => {
  return (
    <div className='min-h-screen'>
      <div>
        <props.Navbar />
        <div className='w-full h-full flex justify-left m-20'>
          <div className=''>
            <h1 className='font-bold text-2xl'>Hello {userInfo.username}!</h1>
            <h1 className='font-bold text-2xl text-yellow-600'>
              Welcome to the LearnUp Dashboard
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';

interface Props {
  login: (body: UserLoginInfoObj) => void;
  toggleLogginIn: () => void;
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    props.login(body);
  };

  return (
    <div className='border-2 border-blue-600 2xl:w-1/4 xl:w-1/2 rounded-lg bg-gray-100 shadow-xl'>
      <div className='flex flex-col text-center py-4'>
        <h1 className='text-xl font-bold'>Sign In</h1>
        <p>to continue to LearnUp</p>
      </div>
      <div>
        <form
          onSubmit={(e) => handleSignIn(e)}
          className='flex flex-col justify-left px-12'>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='my-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md rounded'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md rounded'
          />
          <div>
            <button className='text-blue-500 hover:text-blue-700 px-10 text-sm font-medium focus:outline-none'>
              Forgot password?
            </button>
          </div>
          <div className='flex justify-around mt-8 py-4'>
            {/* this will just toggle the form so it displays different inputs */}
            <button
              onClick={props.toggleLogginIn}
              className='text-blue-500 hover:text-blue-700 px-10 text-sm font-medium focus:outline-none'>
              Create Account
            </button>
            <button
              onClick={(e) => handleSignIn(e)}
              className='bg-blue-500 hover:bg-blue-700 text-white font-semibold stroke px-4 py-2 rounded-lg shadow-lg focus:outline-none'>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

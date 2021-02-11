import React from 'react';

interface Props {
  register: (body: UserInfoObj) => void;
  toggleLogginIn: () => void;
}

const RegisterForm: React.FC<Props> = (props: Props) => {
  const [errors, setErrors] = React.useState<string[] | undefined>(undefined);

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirm] = React.useState('');

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrors(undefined);
    // I need to get errors form the request as well and display them here
    if (password !== confirmPass) {
      setErrors(['Passwords do not match']);
    }

    const body = {
      username,
      email,
      password,
    };

    props.register(body);
  };

  return (
    <div className='border-2 border-blue-600 2xl:w-1/4 xl:w-1/2 rounded-lg bg-gray-100 shadow-xl'>
      <div className='flex flex-col text-center py-4'>
        <h1 className='text-xl font-bold'>Sign Up</h1>
        <p>to continue to LearnUp</p>
      </div>
      <div>
        <form className='flex flex-col justify-left px-12'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='my-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md rounded'
          />
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
          <input
            type='password'
            placeholder='Verify Password'
            value={confirmPass}
            onChange={(e) => setConfirm(e.target.value)}
            className='mt-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md rounded'
          />

          <div className='py-2'>
            {errors &&
              errors.map((error, index) => (
                <div
                  key={index}
                  className='flex justify-center bg-red-400 text-red-800 py-2 px-8 rounded'>
                  {error}
                </div>
              ))}
          </div>
          <div className='flex justify-around mt-8 py-4'>
            {/* this will just toggle the form so it displays different inputs */}
            <button
              onClick={props.toggleLogginIn}
              className='text-blue-500 hover:text-blue-700 px-10 text-sm font-medium focus:outline-none'>
              Sign In
            </button>
            <button
              onClick={(e) => handleRegister(e)}
              className='bg-blue-500 hover:bg-blue-700 text-white font-semibold stroke px-4 py-2 rounded-lg shadow-lg focus:outline-none'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

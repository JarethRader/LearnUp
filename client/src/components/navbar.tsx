import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  routes: {
    [key: string]: any;
  }[];
}

const Navbar = (props: Props) => {
  return (
    <div className='flex flex-row-reverse justify-center'>
      {props.routes.map(({ path, name }) => (
        <div key={name} className='px-2'>
          <Link to={path}>{name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;

import { RegisterHelper } from './register';
import { LoginHelper } from './login';
import { UpdateHelper } from './update';
import { LogoutHelper } from './logout';
import { getUserHelper } from './getUser';
import { deleteHelper } from './delete';
import { findUserHelper } from './findUser';

const UserHelperFunctions = Object.freeze({
  RegisterHelper,
  LoginHelper,
  UpdateHelper,
  LogoutHelper,
  getUserHelper,
  deleteHelper,
  findUserHelper,
});

export default UserHelperFunctions;
export {
  RegisterHelper,
  LoginHelper,
  UpdateHelper,
  LogoutHelper,
  getUserHelper,
  deleteHelper,
  findUserHelper,
};

import { RegisterHelper } from './register';
import { LoginHelper } from './login';
import { UpdateHelper } from './update';
import { LogoutHelper } from './logout';
import { getUserHelper } from './getUser';
import { deleteHelper } from './delete';

const UserHelperFunctions = Object.freeze({
  RegisterHelper,
  LoginHelper,
  UpdateHelper,
  LogoutHelper,
  getUserHelper,
  deleteHelper,
});

export default UserHelperFunctions;
export {
  RegisterHelper,
  LoginHelper,
  UpdateHelper,
  LogoutHelper,
  getUserHelper,
  deleteHelper,
};

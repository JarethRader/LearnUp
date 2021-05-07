import { RegisterHelper } from "./register";
import { LoginHelper } from "./login";
import { UpdateHelper } from "./update";
import { LogoutHelper } from "./logout";
import { getUserHelper } from "./getUser";
import { sessionHelper } from "./session";
import { deleteHelper } from "./delete";
import { findUserHelper } from "./findUser";

const UserHelperFunctions = Object.freeze({
  RegisterHelper,
  LoginHelper,
  UpdateHelper,
  LogoutHelper,
  getUserHelper,
  sessionHelper,
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
  sessionHelper,
  deleteHelper,
  findUserHelper,
};

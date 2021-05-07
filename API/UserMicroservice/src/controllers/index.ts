import {
  addUser,
  editUser,
  listUser,
  findUser,
  removeUser,
  authenticateCredentials,
} from "../use-cases";
import makePostUser from "./post-user";
import makePatchUser from "./patch-user";
import makeGetUser from "./get-user";
import makeGetSession from "./get-session";
import makeFindUser from "./find-user";
import makeDeleteUser from "./delete-user";
import makeLoginUser from "./login-user";
import makeLogoutUser from "./logout-user";

const postUser = makePostUser(addUser);
const patchUser = makePatchUser(editUser);
const listSelf = makeGetUser(listUser);
const getSession = makeGetSession(listUser);
const findOther = makeFindUser(findUser);
const deleteUser = makeDeleteUser(removeUser);
const loginUser = makeLoginUser(authenticateCredentials, listUser);
const logoutUser = makeLogoutUser();

const userController = {
  postUser,
  patchUser,
  listSelf,
  getSession,
  findOther,
  deleteUser,
  loginUser,
  logoutUser,
};

export default userController;
export {
  postUser,
  patchUser,
  listSelf,
  getSession,
  findOther,
  deleteUser,
  loginUser,
  logoutUser,
};

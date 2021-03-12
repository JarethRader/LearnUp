/// <reference path='../types/index.d.ts' />

import makeUser from "../user";

const buildAddUser: BuildAddUser = (userDb, validate) => {
  const addUser = async (userInfo: IMakeUser) => {
    const user: IUserObject = makeUser(userInfo);
    const validated = await validate(user)
      .then((validated) => validated)
      .catch((err) => {
        throw new Error(err);
      });

    const userInstance = await userDb();

    return await userInstance.insert(validated);
  };
  return addUser;
};

export default buildAddUser;

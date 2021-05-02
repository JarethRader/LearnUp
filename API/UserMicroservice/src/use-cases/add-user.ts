/// <reference path='../types/index.d.ts' />

import makeUser from "../user";

const buildAddUser: BuildAddUser = (userDb, validate) => {
  const addUser = async (userInfo: IMakeUser) => {
    return new Promise<IUserModel>(async (resolve, reject) => {
      const user: IUserObject = makeUser(userInfo);
      const validated = await validate(user)
        .then((validated) => validated)
        .catch((err) => {
          reject(err);
        });

      const userInstance = await userDb();

      await userInstance
        .insert(validated)
        .then((newUser) => {
          if (newUser) resolve(newUser);
          else reject("Failed to create new user");
        })
        .catch((err) => reject(err));
    });
  };
  return addUser;
};

export default buildAddUser;

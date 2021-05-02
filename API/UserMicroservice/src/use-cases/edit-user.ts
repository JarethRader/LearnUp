import makeUser from "../user";

const buildEditUser: BuildEditUser = (userDb, validate) => {
  const editUser = async (id: string, changeInfo: IEditUser) => {
    return new Promise<IUserModel>(async (resolve, reject) => {
      const userInstance = await userDb();

      const user = await userInstance.findOneById(id);

      const validated = await validate(changeInfo);

      const changes: IMakeUser = makeUser({
        ...(user && user.toObject()),
        ...validated,
      }).toObject();

      const filtered: IUserObject = Object.keys(changes)
        .filter((key) => key != "_id")
        .reduce((obj: any, key: any) => {
          obj[key] = changes[key];
          return obj;
        }, {});

      await userInstance
        .update(id, filtered)
        .then((updatedUser) => {
          if (updatedUser) resolve(updatedUser);
          else reject("Failed to updated user");
        })
        .catch((err) => reject(err));
    });
  };
  return editUser;
};

export default buildEditUser;

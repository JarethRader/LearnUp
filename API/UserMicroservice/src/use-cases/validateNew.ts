const makeValidate: MakeUserValidate = (userDb, toObjectId) => {
  const validate = async (user: IUserObject) => {
    return new Promise<IMakeUser>(async (resolve, reject) => {
      const userInstance = await userDb();

      await userInstance
        .findOneByEmail(user.getEmail())
        .then((foundUser) => {
          if (foundUser && foundUser.id !== user.getId()) {
            reject("That email address is already registered");
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });

      resolve({
        _id: toObjectId(user.getId()),
        username: user.getUsername(),
        email: user.getEmail(),
        password: await user.getPassword(),
        teacher: user.getIsTeacher(),
        verified: user.getVerified(),
        createdAt: user.getCreatedOn(),
        updatedAt: user.getModifiedOn(),
      });
    });
  };
  return validate;
};

export default makeValidate;

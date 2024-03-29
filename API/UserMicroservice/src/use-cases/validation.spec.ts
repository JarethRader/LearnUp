// @ts-ignore
import makeFakeUser from "../../__test__/user";
import makeValidate from "./validateNew";
import mongoose from "mongoose";
import makeDb from "../data-access";

const makeUser = (user: any) => {
  return Object.freeze({
    getId: () => user.id,
    getUsername: () => user.username,
    getEmail: () => user.email.toLowerCase(),
    getPassword: async () => await user.password,
    getIsTeacher: () => user.teacher,
    getCreatedOn: () => user.createdOn,
    getModifiedOn: () => user.modifiedOn,
    getVerified: () => user.verified,
    verify: () => {
      user.verified = true;
    },
    makeTeacher: () => {
      user.teacher = true;
    },
    toObject: () => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdOn: user.createdOn,
        modifiedOn: user.modifiedOn,
        verified: user.verified,
      };
    },
  });
};

const toObjectId = (id: string) => new mongoose.mongo.ObjectId(id);

describe("User validation middleware", () => {
  it("Returns a user object", async () => {
    const user: IUserObject = makeUser(makeFakeUser({}));
    const validate = await makeValidate(makeDb, toObjectId);
    const validated = await validate(user);
    expect(validated._id.toHexString()).toBe(user.getId());
  });

  it("Permits only one email per account", async () => {
    const email = "jarp@email.com";
    const user1 = makeUser(makeFakeUser({ email }));
    const user2 = makeUser(makeFakeUser({ email }));

    const validate = makeValidate(makeDb, toObjectId);

    await validate(user1).then((validated) =>
      expect(validated._id).toStrictEqual(toObjectId(user1.getId()))
    );

    return validate(user2).catch((err) =>
      expect(err).toBe("That email address is already registered")
    );
  });
});

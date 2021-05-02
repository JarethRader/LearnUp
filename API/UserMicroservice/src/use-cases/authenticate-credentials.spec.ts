// @ts-ignore
import makeFakeUser from "../../__test__/user";
import makeDb from "../data-access";
import buildAuthenticateCredentials from "./authenticate-credentials";

const Authenticate = Object.freeze({
  validatePassword: async (givenPassword: string, storedPassword: string) =>
    givenPassword === storedPassword,
});

describe("Authenticate Credentials", () => {
  it("Checks if passwords match", async () => {
    const user = makeFakeUser({ password: "password" });
    const db = await makeDb();

    await db.insert(user);

    const authenticateCredentials = buildAuthenticateCredentials(
      makeDb,
      Authenticate
    );

    return authenticateCredentials(
      user.email,
      "password"
    ).then((authenticatedUser) => expect(authenticatedUser).toBe(user.id));
  });

  it("Rejects if the passwords don't match", async () => {
    const user = makeFakeUser({ password: "password" });
    const db = await makeDb();

    await db.insert(user);

    const authenticateCredentials = buildAuthenticateCredentials(
      makeDb,
      Authenticate
    );

    return authenticateCredentials(user.email, "notpassword").catch((error) =>
      expect(error).toMatch("Password was invalid")
    );
  });
});

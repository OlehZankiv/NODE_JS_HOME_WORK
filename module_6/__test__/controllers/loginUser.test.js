// import { loginUser } from "../../controllers/users/index.js";

import { mockRequest, mockResponse } from "../mocks.js";
import { DB_URI } from "../../utils/constants.js";
import { loginUser } from "../../controllers/users/index.js";
import mongoose from "mongoose";

describe("Login user controller works fine", () => {
  beforeAll(() => mongoose.connect(DB_URI));
  afterAll(mongoose.disconnect);

  test("Login controller works find for success request", async () => {
    const req = mockRequest(
      {},
      { email: "firegames5645+5@gmail.com", password: "somepassword" }
    );
    const res = mockResponse();

    await loginUser(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: expect.objectContaining({
        email: expect.stringContaining("@"),
        subscription: expect.stringMatching("starter|pro|business"),
      }),
    });
  });
});

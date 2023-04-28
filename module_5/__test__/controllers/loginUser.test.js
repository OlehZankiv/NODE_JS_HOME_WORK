// import { loginUser } from "../../controllers/users/index.js";

import { mockRequest, mockResponse } from "../mocks.js";
import { loginUser } from "../../controllers/users/index.js";

describe("Login user controller works fine", () => {
  test("Controller return 200 status for success request", async () => {
    const req = mockRequest(
      {},
      { email: "firegames5645+5@gmail.com", password: "somepassword" }
    );
    const res = mockResponse();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

const { notFoundErrorHandler, errorHandler } = require("./error");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given an notFoundErrorHandler middleware,", () => {
  describe("When it gets a request", () => {
    test("Then it should send a response with a 'Soory, endpoint not found' error and a status code of 404", () => {
      const res = mockResponse();
      const expectedError = { error: "Soory, endpoint not found" };
      const req = {};

      notFoundErrorHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given an errorHandler middleware,", () => {
  describe("When it gets a request and an error and no error code", () => {
    test("Then it should send a response with a 'All broken :(' error and a status code of 500", () => {
      const res = mockResponse();
      const error = { error: "All broken :(" };
      const req = {};
      const next = () => {};

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});

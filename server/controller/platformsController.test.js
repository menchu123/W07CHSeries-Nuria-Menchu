const Platform = require("../../database/models/platform");

const {
  getPlatforms,
  createPlatforms,
  updatePlatforms,
  deletePlatforms,
} = require("./platformsController");

jest.mock("../../database/models/platform");

describe("Given a getPlatforms function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json ", async () => {
      const platforms = [
        {
          name: "Netflix",
          price: "10",
        },
      ];
      Platform.find = jest.fn().mockResolvedValue(platforms);

      const res = {
        json: jest.fn(),
      };

      await getPlatforms(null, res);

      expect(Platform.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(platforms);
    });
  });
});

describe("Given a createPlatforms function", () => {
  describe("When it receives an object res, an object req with a body", () => {
    test("Then it should invoke the method json ", async () => {
      const platform = {
        name: "Ororo",
        price: "6",
      };

      const req = {
        userInfo: {
          admin: true,
        },
        body: platform,
      };

      Platform.create = jest.fn().mockResolvedValue(platform);

      const res = {
        json: jest.fn(),
      };

      const next = () => {};

      await createPlatforms(req, res, next);

      expect(Platform.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(platform);
    });
  });
  describe("When it receives an object res, an object req with a body but the user is not an admin", () => {
    test("Then it should invoke next with a 'You wish' error", async () => {
      const platform = {
        name: "Ororo",
        price: "6",
      };

      const req = {
        userInfo: {
          admin: false,
        },
        body: platform,
      };

      const res = {};

      const expectedError = {
        code: 401,
        message: "You wish",
      };

      const next = jest.fn();

      await createPlatforms(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});

describe("Given a updatePlatforms function", () => {
  describe("When it receives an object res, an object req with a body", () => {
    test("Then it should invoke the method json and update a new platform ", async () => {
      const newPlatform = {
        name: "Ororo",
        price: "8",
      };

      const req = {
        userInfo: {
          admin: true,
        },
        params: {
          id: 1,
        },
        body: newPlatform,
      };

      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(newPlatform);

      const res = {
        json: jest.fn(),
      };

      const next = () => {};

      await updatePlatforms(req, res, next);

      expect(Platform.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newPlatform);
    });
  });

  describe("When it receives an object res, an object req with a body, but the user is not admin", () => {
    test("Then it should invoke next with a 'You wish' error", async () => {
      const newPlatform = {
        name: "Ororo",
        price: "8",
      };

      const req = {
        userInfo: {
          admin: false,
        },
        params: {
          id: 1,
        },
        body: newPlatform,
      };

      const res = {};

      const expectedError = {
        code: 401,
        message: "You wish",
      };

      const next = jest.fn();

      await updatePlatforms(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When it receives a non existent platform", () => {
    test("Then it should invoke a next function with an error status 404 ", async () => {
      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const req = {
        userInfo: {
          admin: true,
        },
        params: {
          id: "1234",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      const expectedError = {
        code: 404,
        message: "Platform not found",
      };

      await updatePlatforms(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});
describe("Given a deletePlatforms function", () => {
  describe("When it receives a request with an id of a platform, an object res with a body", () => {
    test("Then it should delete the platform with id 1234 ", async () => {
      const idPlatform = "1234";

      const platform = {
        name: "Ororo",
        price: "8",
        id: idPlatform,
      };

      const req = {
        userInfo: {
          admin: true,
        },
        params: { idPlatform },
      };

      Platform.findByIdAndDelete = jest.fn().mockResolvedValue({});

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      await deletePlatforms(req, res, next);

      expect(Platform.findByIdAndDelete).toHaveBeenCalledWith(platform.id);
    });
  });

  describe("When it receives a request with an id of a platform, an object res with a body but the user is not admin", () => {
    test("Then it should invoke next with a 'You wish' error ", async () => {
      const idPlatform = "1234";

      const platform = {
        name: "Ororo",
        price: "8",
        id: idPlatform,
      };

      const req = {
        userInfo: {
          admin: false,
        },
        params: { idPlatform },
      };

      const res = {};

      const next = jest.fn();

      const expectedError = {
        code: 401,
        message: "You wish",
      };

      await deletePlatforms(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When it receives a non existent platform and findByIdAndDelete is rejected", () => {
    test("Then it should invoke a next function with an error status 404 ", async () => {
      const error = {};

      Platform.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      const req = {
        userInfo: {
          admin: true,
        },
        params: { idPlatform: 0 },
      };
      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      await deletePlatforms(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

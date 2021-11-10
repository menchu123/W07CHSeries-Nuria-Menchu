const Platform = require("../../database/models/platform");

const { getPlatforms, createPlatforms } = require("./platformsController");


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
});


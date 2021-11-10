const Platform = require("../../database/models/platform");
const { getPlatforms } = require("./platformsController");

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

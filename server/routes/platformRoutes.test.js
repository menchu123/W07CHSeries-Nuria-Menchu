require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const debug = require("debug")("platform:testRoutes");
const initializeDB = require("../../database");
const { app, initializeServer } = require("..");
const Platform = require("../../database/models/platform");
const chalk = require("chalk");

const request = supertest(app);

const fakePlatforms = [
  {
    name: "Netflix",
    price: 10,
  },
  {
    name: "Filmin",
    price: 12,
  },
];

const fakePlatformsWithId = [
  {
    _id: "618cea6689f96dd1ef474c30",
    name: "Netflix",
    price: 10,
  },
  {
    _id: "618cea6689f96dd1ef474c32",
    name: "Filmin",
    price: 12,
  },
];

let server;
let token;

beforeAll(async () => {
  await initializeDB(process.env.MONGO_DBSTRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  await Platform.deleteMany();
  await Platform.create(fakePlatformsWithId[0]);
  await Platform.create(fakePlatformsWithId[1]);
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Connection to database ended"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("Connection to server ended"));
  });
  await server.close();
});

describe("Given a /platforms route", () => {
  describe("When it receives a GET request ", () => {
    test("Then it should respond with an array of platforms and status 200", async () => {
      const { body } = await request.get("/platforms").expect(200);

      const fakePlatformsId = fakePlatformsWithId.map((fakePlatform) => {
        const fakePlatformWithId = {
          ...fakePlatform,
          id: fakePlatform._id,
        };
        delete fakePlatformWithId._id;
        return fakePlatformWithId;
      });
      expect(body).toHaveLength(fakePlatforms.length);
      expect(body).toContainEqual(fakePlatformsId[0]);
      expect(body).toContainEqual(fakePlatformsId[1]);
    });
  });
});
describe("Given a /platforms route", () => {
  describe("When it receives a POST request ", () => {
    test("Then it should respond with an array of platforms and status 200", async () => {
      const { body } = await request
        .post("/platforms")
        .send({
          name: "Hola",
          price: 10,
        })
        .expect(200);

      expect(body).toHaveProperty("name", "Hola");
    });
  });
  describe("When it receives a POST with an incorrect request", () => {
    test("Then it should send an error and status code of 400", async () => {
      const { body } = await request
        .post("/platforms")
        .send({
          name: "Hola",
          praise: 34,
        })
        .expect(400);

      const expectedError = { error: "Bad request sorry" };

      expect(body).toEqual(expectedError);
    });
  });
});

describe("Given a /platforms/:idPlatform", () => {
  describe("When it receives a DELETE method with an incorrect ID", () => {
    test("Then it should send an error and status code of 400", async () => {
      const { body } = await await request
        .delete("/platforms/618cea6689f96dd1ef474c39")
        .expect(404);

      const expectedError = {
        error: "Not found",
      };

      expect(body).toEqual(expectedError);
    });
  });
  describe("When it receives a DELETE method with a correct ID", () => {
    test("Then it should respond with a platform deleted and status 200", async () => {
      const { body } = await request
        .delete("/platforms/618cea6689f96dd1ef474c32")
        .expect(200);

      expect(body).not.toHaveProperty("name", "Filmin");
    });
  });
});

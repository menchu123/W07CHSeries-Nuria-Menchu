require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const debug = require("debug")("platform:testRoutes");
const { initializeDB } = require("../../database/index");
const { app, initializeServer } = require("..");

const request = supertest(app);

let server;
let token;

beforeAll(async () => {
  await initializeDB(process.env.MONGO_DBSTRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
  const { body } = await re;
});

beforeEach(async () => {});

afterAll(async () => {});

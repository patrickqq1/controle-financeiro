import knex from "knex";
import pkg from "./knex/knexfile.cjs"
const { dbConfig } = pkg;

const getEnviroment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return dbConfig.production;
    case "development":
      return dbConfig.development;
    default:
      throw new Error("Defina a variavel de ambiente!");
  }
};

export const db = knex(getEnviroment());

import knex from "knex";
import { development, production } from "./knex/knexfile.cjs";

const getEnviroment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;
    case "development":
      return development;
    default:
      throw new Error("Defina a variavel de ambiente!");
  }
};

export const db = knex(getEnviroment());

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: true }
          : false,
    },
    // pool:{
    //we use this if we want to put a min or max for a query and how many req we can allow
    // }
  }
);

//if we see brackets in the js this function is immediately executed
async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres connected via Sequelize");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;

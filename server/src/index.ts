import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { User } from "./entity/User";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection();

  const app = express();

  app.get("/", (_, res) => res.end("test"));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
  });
};

main();

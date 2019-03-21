// file: server/main.js
import { initialize } from "meteor/cultofcoders:apollo";
import { load } from "graphql-load";

import { gql } from "graphql";

const user1 = {
  name: "Tom",
  age: 3
};

load({
  typeDefs: `
    type User {
      name: String,
      age: Int
    }
    type Query {
      sayHello: String
      user: User
    }
  `,
  resolvers: {
    Query: {
      sayHello: () => "Hello world!",
      user: () => user1
    }
  }
});

initialize();

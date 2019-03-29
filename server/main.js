// file: server/main.js
import "./accounts";
import { initialize } from "meteor/cultofcoders:apollo";
import { load } from "graphql-load";

import { gql, getIntrospectionQuery } from "graphql";

const user1 = {
  id: "342fdfds3421c_)$3523",
  fullName: "Tom Hill",
  age: 34,
  username: "Tom",
  email: "tom@example.com",
  password: "tom123",
  userData: ["a", "b", "c"]
};

load({
  typeDefs: `
    type UserEmail { 
      address: String, 
      verified: Boolean 
    }
    type User {
      _id: ID,
      username: String,
      emails: [UserEmail]
      password: String,
      plainPassword: String
    }
    type Query {
      sayHello: String
      scream: String
      me(username: String): User
    }
  `,
  resolvers: {
    Query: {
      sayHello: () => "Hello world!",
      scream: () => "aaaaaa",
      me: (_, args, context) => {
        console.log("userId", context.userId);
        return Meteor.users.findOne(context.userId);
      }
    }
  }
});

initialize();

// file: server/main.js
import "./accounts";
import { initialize } from "meteor/cultofcoders:apollo";
import { load } from "graphql-load";

import { gql, getIntrospectionQuery } from "graphql";

import { asyncIterator, astToFields, Event } from "apollo-live-server";

import { PubSub } from "graphql-subscriptions";

import "./accounts.js"; // this is what you care about

import { Accounts } from "meteor/accounts-base";

Accounts.config({
  // loginExpirationInDays: 0.0416667,
  loginExpirationInDays: 3650
});

const pubsub = new PubSub();
const SOMETHING_CHANGED_TOPIC = "something_changed";

import { Mongo } from "meteor/mongo";
Meteor.notifications = new Mongo.Collection("notifications");

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
    type Result {
      id: String
    }
    type SubscriptionEvent {
      event: String,
      doc: JSON
    }
    type Message {
      _id: String!
      text: String!
      createdAt: String!
    }
    type MessagesEvent {
      event: String
      doc: Message
    }
    type Notification {
      _id: ID
      title: String
      text: String
    }
    type NotificationReactiveEvent {
      event: String
      doc: Notification
    }
    type Query {
      sayHello: String
      scream: String
      me(username: String): User
      messages: Message
      notification(title: String!): Notification
      notifications: [Notification]
    }
    type Subscription {
      somethingChanged: Result
      users: SubscriptionEvent
      messages: MessagesEvent
      notifications: NotificationReactiveEvent
    }
    type Mutation {
      createNotification(title: String!, text: String!): Notification
    }
  `,
  resolvers: {
    Query: {
      sayHello: () => "Hello world!",
      scream: () => "aaaaaa",
      me: (_, args, context) => {
        console.log("userId", context.userId);
        return Meteor.users.findOne(context.userId);
      },
      messages: () => {
        return Meteor.messages.findOne();
      },
      notification: (_, args, context) => {
        return Meteor.notifications.findOne({ title: args.title });
      },
      notifications: (_, args, context) => {
        //console.log(Meteor.notifications);
        //Meteor.notifications.remove({});
        return Meteor.notifications.find();
      }
    },
    Subscription: {
      somethingChanged: {
        subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
      },
      users: {
        resolve: payload => payload,
        subscribe(_, args, { db }) {
          const observer = db.users.find();

          return asyncIterator(observer);
        }
      },
      messages: {
        resolve: payload => payload,
        subscribe(_, args, { db }) {
          const observer = db.users.find();

          return asyncIterator(observer);
        }
      },
      notifications: {
        resolve: payload => payload,
        subscribe(_, args, { db }, ast) {
          // We assume that you inject `db` context with all your collections
          // If you are using Meteor, db.notifications is an instance of Mongo.Collection
          const observable = db.notifications.find();

          return asyncIterator(observable);
        }
      }
    },
    Mutation: {
      createNotification: (_, args, context) => {
        if (!Meteor.notifications.findOne({ title: args.title })) {
          Meteor.notifications.insert({
            title: args.title,
            text: args.text
          });
          return Meteor.notifications.findOne({ title: args.title });
        }
      }
    }
  }
});

// Meteor.users acts as any other Mongo.Collection you may have
// Simulate some reactivity ...
// let myTitle = "title",
//   myDescription = "description",
//   ind = 1;
// Meteor.setInterval(function() {
//   myTitle += ind;
//   myDescription += ind;
//   ind++;
//   if (ind < 10) {
//     Meteor.notifications.insert({
//       title: myTitle,
//       text: myDescription
//     });
//   }

//   Meteor.setTimeout(function() {
//     //Meteor.users.remove({ _id: userId });
//   }, 500);
// }, 2000);

initialize();

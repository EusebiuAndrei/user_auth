// file: server/main.js
import "./accounts";
import { initialize } from "meteor/cultofcoders:apollo";
import { load } from "graphql-load";

import { gql, getIntrospectionQuery } from "graphql";

import { asyncIterator, astToFields, Event } from "apollo-live-server";

import { PubSub } from "graphql-subscriptions";

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
      _id: String!
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
      notification: Notification
    }
    type Subscription {
      somethingChanged: Result
      users: SubscriptionEvent
      messages: MessagesEvent
      notifications: NotificationReactiveEvent
    }
    type Mutation {
      createNotification: Notification
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
        return Meteor.notifications.findOne({ _id: "abc" });
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
        console.log(_);
      }
    }
  }
});

// Meteor.users acts as any other Mongo.Collection you may have
// Simulate some reactivity ...
import { Accounts } from "meteor/accounts-base";
let notifId = "abc",
  val = 1;

if (!Meteor.notifications.findOne({ _id: "abc" })) {
  Meteor.notifications.insert({
    _id: "abc",
    title: "Notify",
    text: "Try a notification"
  });
}

// Meteor.setInterval(function() {
//   notifId = notifId + val;
//   val++;
//   Meteor.notifications.insert({
//     _id: notifId,
//     title: "Notify",
//     text: "Try a notification"
//   });

//   Meteor.setTimeout(function() {
//     //Meteor.users.remove({ _id: userId });
//   }, 500);
// }, 2000);

// Meteor.setInterval(function() {
//   const userId = Accounts.createUser({
//     username: "Apollo is Live!"
//   });

//   Meteor.setTimeout(function() {
//     Meteor.users.remove({ _id: userId });
//   }, 500);
// }, 2000);

// let text = "1",
//   val = 1;
// pubsub.publish(SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: "123" } });
// pubsub.publish(SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: "12345" } });
// Meteor.setInterval(function() {
//   pubsub.publish(SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: text } });
//   text = `${text}${++val}`;
// }, 2000);

initialize();

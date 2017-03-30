import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Items = new Mongo.Collection('items');
export { Items as default };

/**
  It is an excellent idea to protect the access to Mongo collections
  if an user has not logged in yet.
**/

if (Meteor.isServer) {
  // This code only runs on the server
  // Autopublish should be deactivated to use this function.
  Meteor.publish('items', () => Items.find({}));
}

Meteor.methods({
  'items.insert'(item) {
    check(item, Object);
    check(item.name, String);
    check(item.dueDay, String);
    check(item.category, String);
    check(item.type, String);
    check(item.periodicity, String);
    check(item.amount, String);

    // Make sure the user is logged in before inserting an item
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Items.insert({
      name: item.name,
      dueDay: item.dueDay,
      category: item.category,
      type: item.type,
      periodicity: item.periodicity,
      amount: item.amount,
      completed: false,
      creator: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'items.remove'(itemId) {
    check(itemId, String);

    const item = Items.findOne(itemId);
    if (item.creator !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Items.remove(itemId);
  },
  'items.setCompleted'(itemId, setCompleted) {
    check(itemId, String);
    check(setCompleted, Boolean);

    const item = Items.findOne(itemId);
    if (item.creator !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Items.update(itemId, { $set: { completed: setCompleted } });
  },
});

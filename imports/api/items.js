import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Items = new Mongo.Collection('items');
export { Items as default };

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('items', () => Items.find({}));
}

Meteor.methods({
  itemInsert(item) {
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
  itemRemove(itemId) {
    check(itemId, String);

    const item = Items.findOne(itemId);
    if (item.creator !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Items.remove(itemId);
  },
  setCompletedItem(itemId, setCompleted) {
    check(itemId, String);
    check(setCompleted, Boolean);

    const item = Items.findOne(itemId);
    if (item.creator !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Items.update(itemId, { $set: { completed: setCompleted } });
  },
});

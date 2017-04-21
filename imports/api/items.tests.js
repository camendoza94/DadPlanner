/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';

import Items from './items.js';

Factory.define('user', Meteor.users, {
  createdAt: () => new Date(),
  username: () => faker.internet.email(),
});

Factory.define('item', Items, {
  name: () => faker.lorem.word(),
  dueDay: () => faker.date.future().toString(),
  category: () => faker.lorem.word(),
  type: () => faker.lorem.word(),
  periodicity: () => faker.lorem.word(),
  amount: () => faker.random.number().toString(),
  completed: () => false,
});

if (Meteor.isServer) {
  describe('Items', () => {
    describe('methods', () => {
      const otherUserId = Random.id();
      let userId;

      beforeEach(() => {
        resetDatabase();
        userId = Factory.create('user')._id;
      });

      it('can remove owned item', () => {
        const item = Factory.create('item', { creator: userId });
        const itemRemove = Meteor.server.method_handlers.itemRemove;
        const invocation = { userId };
        itemRemove.apply(invocation, [item._id]);
        assert.equal(Items.find().count(), 0);
      });

      it('cannnot remove not-owned item', () => {
        const item = Factory.create('item', { creator: userId });
        const itemRemove = Meteor.server.method_handlers.itemRemove;
        const invocation = { otherUserId };
        assert.throws(() => itemRemove.apply(invocation, [item._id]), Error, 'not-authorized');
      });

      it('can insert item', () => {
        const item = Factory.build('item');
        const itemInsert = Meteor.server.method_handlers.itemInsert;
        const invocation = { userId };
        itemInsert.apply(invocation, [item]);
        assert.equal(Items.find().count(), 1);
      });

      it('cannot insert item when not logged in', () => {
        const item = Factory.build('item');
        const itemInsert = Meteor.server.method_handlers.itemInsert;
        const invocation = {};
        assert.throws(() => itemInsert.apply(invocation, [item]), Error, 'not-authorized');
      });

      it('can set owned item as completed/not completed', () => {
        const item = Factory.create('item', { creator: userId });
        const completed = faker.random.boolean();
        const itemSetCompleted = Meteor.server.method_handlers.itemSetCompleted;
        const invocation = { userId };
        itemSetCompleted.apply(invocation, [item._id, completed]);
        assert.equal(Items.findOne(item._id).completed, completed);
      });

      it('cannnot set not-owned item as completed/not completed', () => {
        const item = Factory.create('item', { creator: userId });
        const completed = faker.random.boolean();
        const itemSetCompleted = Meteor.server.method_handlers.itemSetCompleted;
        const invocation = { otherUserId };
        assert.throws(() => itemSetCompleted.apply(invocation, [item._id, completed]), Error, 'not-authorized');
      });
    });
  });
}

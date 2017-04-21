/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';

import FutureTasks from './reminders.js';

if (Meteor.isServer) {
  describe('Reminders', () => {
    describe('methods', () => {
      beforeEach(() => {
        resetDatabase();
      });

      it('can send email', () => {
        const sendEmail = Meteor.server.method_handlers.sendMail;
        const invocation = { };
        const details = {
          from: 'planeadorpapapapasapp@gmail.com',
          to: faker.internet.email(),
          subject: 'Test',
          text: faker.lorem.sentence(),
          date: new Date(),
        };
        assert.doesNotThrow(() => sendEmail.apply(invocation, [details]), Error);
      });
      it('can add a task to scheduler', () => {
        const addTask = Meteor.server.method_handlers.addTask;
        const invocation = { };
        const details = {
          from: 'planeadorpapapapasapp@gmail.com',
          to: faker.internet.email(),
          subject: 'Test',
          text: faker.lorem.sentence(),
          date: new Date(),
        };
        assert.doesNotThrow(() => addTask.apply(invocation, [Random.id(), details]), Error);
      });
      it('can add a future task to the database', () => {
        const scheduleMail = Meteor.server.method_handlers.scheduleMail;
        const userId = Factory.create('user')._id;
        const invocation = { userId };
        const name = faker.lorem.word();
        const dueDay = faker.date.future().toString();
        assert.doesNotThrow(() => scheduleMail.apply(invocation, [name, dueDay]), Error);
        assert.equal(FutureTasks.find().count(), 1);
      });
    });
  });
}

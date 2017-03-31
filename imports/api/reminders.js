import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { SyncedCron } from 'meteor/percolate:synced-cron';

const FutureTasks = new Mongo.Collection('future_tasks'); // server-side only
export { FutureTasks as default };

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('future_tasks', () => FutureTasks.find({}));
}

Meteor.methods({
  findTasks() {
    return FutureTasks.find().fetch();
  },
  sendMail(details) {
    check(details, Object);
    Email.send({
      to: details.to,
      from: details.from,
      subject: details.subject,
      text: details.text,
    });
  },
  addTask(id, details) {
    check(id, String);
    check(details, Object);
    SyncedCron.add({
      name: id,
      schedule: parser => parser.recur().on(details.date).fullDate(),
      job: () => {
        Meteor.call('sendMail', details);
        FutureTasks.remove(id);
        SyncedCron.remove(id);
        // TODO: hacer que la vuelva a agregar con la periodicidad
        return id;
      },
    });
  },
  scheduleMail(name, dueDay) {
    check(name, String);
    check(dueDay, String);
    const msg = `Este es un correo de Planeador de Papas recordandote que tienes que pagar: ${name} el proximo ${dueDay}.`;
    const details = {
      from: 'planeadorpapapapasapp@gmail.com',
      to: Meteor.users.findOne(this.userId).username,
      subject: 'Recordatorio de Pago - PPP',
      text: msg,
      date: new Date(dueDay),
    };

    if (details.date < new Date()) {
      Meteor.call('sendMail', details);
    } else {
      const thisId = FutureTasks.insert(details);
      Meteor.call('addTask', thisId, details);
    }
    return true;
  },

});

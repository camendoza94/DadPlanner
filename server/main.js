import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import '../imports/api/reminders.js';
import '../imports/api/items.js';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.addHtmlAttributeHook(() => ({ lang: 'es' }));

  process.env.MAIL_URL = 'smtp://planeadorparapapasapp@gmail.com:ppp_webdev@smtp.gmail.com:465/';
  Meteor.call('findTasks').forEach(function (mail) {
    if (mail.date < new Date()) {
      Meteor.call('findTasks', mail);
    } else {
      Meteor.call('addTask', mail._id, mail);
    }
  });

  SyncedCron.start();
});

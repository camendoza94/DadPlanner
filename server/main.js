import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import { findTasks, sendMail, addTask } from '../imports/api/reminders.js';
import '../imports/api/items.js';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.addHtmlAttributeHook(() => ({ lang: 'es' }));

  process.env.MAIL_URL = 'smtp://planeadorparapapasapp@gmail.com:ppp_webdev@smtp.gmail.com:465/';
  findTasks().forEach(function (mail) {
    if (mail.date < new Date()) {
      sendMail(mail);
    } else {
      addTask(mail._id, mail);
    }
  });

  SyncedCron.start();
});

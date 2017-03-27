import { Meteor } from 'meteor/meteor';
import '../imports/api/items.js';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.addHtmlAttributeHook(function() {
      return {
          "lang": "es"
      }
  })
});

import { Meteor } from 'meteor/meteor';
import '../imports/api/items.js';

Meteor.startup(() => {
  // code to run on server at startup
  // +1: Add language tag to HTML document
  WebApp.addHtmlAttributeHook(function() {
      return {
          "lang": "es"
      }
  })
});

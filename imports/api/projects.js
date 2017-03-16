import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('projects', () => Projects.find({}));
}
 
Meteor.methods({
  'projects.rate'(projectId, rating){
    check(projectId, String);
    check(rating, Number);
    const project = Projects.findOne(projectId);
    if(!this.userId || project.creator === this.userId){
      throw new Meteor.Error('not-authorized');
    }
    Projects.update(projectId, { $inc: { ratingSum: rating, ratingCount: 1 }, $push: { ratedBy: this.userId} });
  },
  'projects.insert'(name) {
    check(name, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Projects.insert({
      name,
      createdAt: new Date(),
      creator: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      rating: 0,
      ratedBy: []
    });
  },
  // 'tasks.remove'(taskId) {
  //   check(taskId, String);

  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can delete it
  //     throw new Meteor.Error('not-authorized');
  //   }

  //   Tasks.remove(taskId);
  // },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  
  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can check it off
  //     throw new Meteor.Error('not-authorized');
  //   }
    
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
  // 'tasks.setPrivate'(taskId, setToPrivate) {
  //   check(taskId, String);
  //   check(setToPrivate, Boolean);
 
  //   const task = Tasks.findOne(taskId);
 
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
 
  //   Tasks.update(taskId, { $set: { private: setToPrivate } });
  // },
});
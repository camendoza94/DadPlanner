import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";

import { Projects } from '../api/projects.js';

import Project from "./Project.jsx";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: ''
    };
  }

  handleChange(event) {
    this.setState({desc: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('projects.insert', this.state.desc);
  }
  renderProjects() {
    //let filteredProjects = this.props.projects.filter(project => project.creator !== this.props.currentUser);
    return this.props.projects.map( (project) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const sameUser = project.creator === currentUserId;
      return (
        <Project 
          key= {project._id}
          project={project}
          sameUser={sameUser}
          currentUser={this.props.currentUser}
        />
      );
    });
  }

  render() {
    return(
      <div className ="container">
        <h1>PeerGrader</h1>
        <AccountsUIWrapper />
        { this.props.currentUser ?
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              value = {this.props.desc}
              placeholder="Type to add new projects"
              onChange={this.handleChange.bind(this)}
            />
          </form> : ''
        }
        <h2>Projects:</h2>
        <ul>
        {this.renderProjects()}
        </ul>
        <h2>Your favorites:</h2>
        <div>Your faves</div>
        <h2>Overall most voted</h2>
        <div>Most voted</div>
      </div>
      );
  }
}


App.propTypes = {
  projects: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};


export default AppContainer = createContainer(()=>{
  Meteor.subscribe('projects');
  return {
    projects: Projects.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
}, App);
/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App.jsx';

if (Meteor.isClient) {
  describe('App', () => {
    it('should render', () => {
      const item = Factory.create('item');
      const component = shallow(<App items={[item]} />);
      chai.assert.equal(component.find('h3').length, 1);
      chai.assert.equal(component.find('.navbar-brand').length, 1);
      chai.assert.equal(component.find('.navbar-nav').length, 2);
    });
  });
}

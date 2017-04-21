/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { shallow } from 'enzyme';
import ListarItems from './ListarItems.jsx';

if (Meteor.isClient) {
  describe('ListarItems', () => {
    it('should render headers and table', () => {
      const item = Factory.create('item', { category: 'Casa' });
      const component = shallow(<ListarItems items={[item]} />);
      component.setState({ displayCategories: ['Casa'] });
      chai.assert.equal(component.find('th').length, 4);
      chai.assert.equal(component.find('h2.yellow-heading').length, 1);
      chai.assert.equal(component.find('.btn-primary').length, 1);
      chai.assert.equal(component.find('.btn-danger').length, 1);
    });
  });
}

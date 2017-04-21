/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { shallow } from 'enzyme';
import AgregarItem from './AgregarItem.jsx';

if (Meteor.isClient) {
  describe('AgregarItem', () => {
    it('should render', () => {
      const component = shallow(<AgregarItem />);
      chai.assert.equal(component.find('label[htmlFor="nombre"]').text(), 'Nombre');
      chai.assert.equal(component.find('label[htmlFor="pagaren"]').text(), 'Pagar en');
      chai.assert.equal(component.find('label[htmlFor="valor"]').text(), 'Valor');
    });
  });
}

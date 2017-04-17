/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import AgregarItem from './AgregarItem.jsx';

/*import {
  setCheckedStatus,
  updateText,
  remove,
} from '../../api/todos/methods.js'; */

if (Meteor.isClient) {
  describe('AgregarItem', () => {
    let item;
    let component;
    before(() => {
      item = Factory.create('item');
    });

    it('should render', () => {
      component = shallow(<AgregarItem />);
      chai.assert.equal(component.find('label[htmlFor="nombre"]').text(), 'Nombre');
      chai.assert.equal(component.find('label[htmlFor="pagaren"]').text(), 'Pagar en');
      chai.assert.equal(component.find('label[htmlFor="valor"]').text(), 'Valor');
    });
  });
}

import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";

import { Items } from '../api/items.js';

import AgregarItem from './AgregarItem.jsx';
import ListarItems from './ListarItems.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export class App extends Component {

  updateItemsList() {
    this.listarItemsChild.updateItemsList();
  }

  render() {
    return(
      <div>

        <br/>

        <div className="row">
          <h1>PLANEADOR PARA PAPAS</h1>
          <p>
            PPP es una aplicación que permite tener el control sobre los pagos
            periódicos que debe hacer un adulto en Colombia. Por ahora soportamos
            3 categorías principales referentes a viviendas (casa), vehiculos (carro)
            y finanzas personales.
          </p>
        </div>

        <br/>

        <div className="row">
          <AccountsUIWrapper />

          {/* Componente: Listar Items */}

          <div className="col-md-8 col-xs-12">
            <ListarItems items = {this.props.items.filter(item => item.creator === this.props.currentUser._id)} ref={(input) => { this.listarItemsChild = input; }} user={this.props.currentUser && this.props.currentUser._id} />
          </div>


          {/* Componente: Agregar Item */}
          <div className="col-md-4 col-xs-12 custyle">
            <AgregarItem user={this.props.currentUser && this.props.currentUser._id} updateItemsList={this.updateItemsList.bind(this)} />
          </div>
        </div>

      </div>
    );
  }
}


App.propTypes = {
  items: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};


export default AppContainer = createContainer(()=>{
  Meteor.subscribe('items');
  return {
    items: Items.find({}).fetch(),
    currentUser: Meteor.user()
  };
}, App);
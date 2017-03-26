import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import update from 'immutability-helper';

export default class AgregarItem extends Component {

  constructor(props){
    super(props);
    this.state={
      item: {
        name: "",
        dueDay: "",
        type: "",
        reminderDate: "",
        amount: ""
      }
    };
  }

  addItem() {
    event.preventDefault();
    Meteor.call('items.insert', this.state.item);
    this.clearAddItemFields();
    this.props.updateItemsList();
  }

  clearAddItemFields() {
    this.setState({item: update(this.state.item, {name: {$set: ""}})});
    this.setState({item: update(this.state.item, {dueDay: {$set: ""}})});
    this.setState({item: update(this.state.item, {reminderDate: {$set: ""}})});
    this.setState({item: update(this.state.item, {amount: {$set: ""}})});
  }

  handleChange(field, event) {
    this.setState({item: update(this.state.item, {name: {$set: ""}})});
  }

  render(){
    return (
      <div>
        <h2>Agregar Item</h2>
        <table className="table table-striped custab">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Nombre </td>
              <td> <input type="text" value={this.state.item.name} onChange={(event) => { this.setState({item: update(this.state.item, {name: {$set: event.target.value}})}) }} /> </td>
            </tr>
            <tr>
              <td> Categoria </td>
              <td>
                <select onChange={(event) => { this.setState({item: update(this.state.item, {category: {$set: event.target.value}})}) }}>
                  <option defaultValue="selected" value={this.state.item.category}> </option>
                  <option value="Casa">Casa</option>
                  <option value="Carro">Carro</option>
                  <option value="Finanzas">Finanzas</option>
                </select>
              </td>
            </tr>
            <tr>
              <td> Tipo </td>
              <td>
                <select onChange={(event) => { this.setState({item: update(this.state.item, {type: {$set: event.target.value}})}) }}>
                  <option defaultValue="selected" value={this.state.item.type}> </option>
                  <option value="Impuesto">Impuesto</option>
                  <option value="Seguro">Seguro</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Pagos">Pagos</option>
                </select>
              </td>
            </tr>
            <tr>
              <td> Pagar en </td>
              <td> <input type="date" value={this.state.item.dueDay} onChange={(event) => { this.setState({item: update(this.state.item, {dueDay: {$set: event.target.value}})}) }} /> </td>
            </tr>
            <tr>
              <td> Recordatorio </td>
              <td> <input type="date" value={this.state.item.reminderDate} onChange={(event) => { this.setState({item: update(this.state.item, {reminderDate: {$set: event.target.value}})}) }} /> </td>
            </tr>
            <tr>
              <td> Valor </td>
              <td> <input type="text" value={this.state.item.amount} onChange={(event) => { this.setState({item: update(this.state.item, {amount: {$set: event.target.value}})}) }} /> </td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary btn-xs pull-right" onClick={this.addItem.bind(this)}> Agregar </button>
      </div>
    );
  }
}

AgregarItem.propTypes = {
  currentUser: PropTypes.object
};

import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import update from 'immutability-helper';

export default class AgregarItem extends Component {

  constructor(props){
    super(props);
    AgregarItem.context = this;
    this.state={
      item: {
        name: "",
        dueDay: "",
        type: "",
        periodicity: "",
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
    this.setState({item: update(this.state.item, {periodicity: {$set: ""}})});
    this.setState({item: update(this.state.item, {amount: {$set: ""}})});
  }

  setItemName(event) {
    this.setState({item: update(this.state.item, {name: {$set: event.target.value}})});
  }

  setItemCategory(event) {
    this.setState({item: update(this.state.item, {category: {$set: event.target.value}})});
  }

  setItemType(event) {
    this.setState({item: update(this.state.item, {type: {$set: event.target.value}})});
  }

  setItemDueDay(event) {
    this.setState({item: update(this.state.item, {dueDay: {$set: event.target.value}})});
  }

  setItemPeriodicity(event) {
    this.setState({item: update(this.state.item, {periodicity: {$set: event.target.value}})});
  }

  setItemAmount(event) {
    this.setState({item: update(this.state.item, {amount: {$set: event.target.value}})});
  }


  render(){
    //console.log(AgregarItem.context.state);
    return (
      <div>
        <h2 className="yellow-heading">Agregar Item</h2>
        <table className="table table-striped custab">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> <label htmlFor="nombre">Nombre</label> </td>
              <td> <input id="nombre" type="text" label="Nombre del elemento a agregar" value={AgregarItem.context.state.item.name} onChange={(event) => { AgregarItem.context.setItemName(event) }} /> </td>
            </tr>
            <tr>
              <td> Categoria </td>
              <td>
                <select className="custab-select" onChange={(event) => { AgregarItem.context.setItemCategory(event) }}>
                  <option defaultValue="selected" value={AgregarItem.context.state.item.category}> </option>
                  <option value="Casa">Casa</option>
                  <option value="Carro">Carro</option>
                  <option value="Finanzas">Finanzas</option>
                </select>
              </td>
            </tr>
            <tr>
              <td> Tipo </td>
              <td>
                <select className="custab-select" onChange={(event) => { AgregarItem.context.setItemType(event) }}>
                  <option defaultValue="selected" value={AgregarItem.context.state.item.type}> </option>
                  <option value="Impuesto">Impuesto</option>
                  <option value="Seguro">Seguro</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Pagos">Pagos</option>
                </select>
              </td>
            </tr>
            <tr>
              <td> <label htmlFor="pagaren">Pagar en</label> </td>
              <td> <input id="pagaren" className="custab-date" type="date" value={AgregarItem.context.state.item.dueDay} onChange={(event) => { AgregarItem.context.setItemDueDay(event) }} /> </td>
            </tr>
            <tr>
              <td> Periodicidad </td>
              <td>
                <select className="custab-select" onChange={(event) => { AgregarItem.context.setItemPeriodicity(event) }}>
                  <option defaultValue="selected" value={AgregarItem.context.state.item.periodicity}> </option>
                  <option value="M">Mensual</option>
                  <option value="B">Bimestral</option>
                  <option value="T">Trimestral</option>
                  <option value="S">Semestral</option>
                  <option value="A">Anual</option>
                </select>
              </td>
            </tr>
            <tr>
              <td> <label htmlFor="valor"> Valor </label> </td>
              <td> <input id="valor" type="text" value={AgregarItem.context.state.item.amount} onChange={(event) => { AgregarItem.context.setItemAmount(event) }} /> </td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-success btn-xs pull-right" onClick={AgregarItem.context.addItem.bind(this)}> Agregar </button>
      </div>
    );
  }
}

AgregarItem.propTypes = {
  currentUser: PropTypes.object
};

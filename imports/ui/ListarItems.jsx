import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ListarItems extends Component {

  static containsElement(arr, el) {
    let i;
    for (i = 0; i < arr.length; i += 1) {
      if (arr[i] === el) {
        return true;
      }
    }
    return false;
  }

  static openEditModal() {
    Modal.show('editModal');
  }

  constructor(props) {
    super(props);
    this.state = {
      tableTitles: ['Nombre', 'Tipo', 'Valor', 'Acción'],
      displayTableKeys: ['name', 'type', 'amount'],
      formatsDisplayTableKeys: ['string', 'string', 'money'],
      displayCategories: [],
    };
  }

  componentDidMount() {
    this.updateItemsList();
  }

  updateItemsList() {
    const newItems = this.props.items;
    const cats = [];
    let i;
    let newCat;
    for (i = 0; i < newItems.length; i += 1) {
      newCat = newItems[i].category;
      if (!ListarItems.containsElement(cats, newCat)) {
        cats.push(newCat);
      }
    }
    this.setState({ displayCategories: cats });
  }

  deleteItem(itemIDToDelete) {
    Meteor.call('itemRemove', itemIDToDelete);
    this.updateItemsList();
  }

  render() {
    return (
      <div>
        {
          this.state.displayCategories != null &&
          this.state.displayCategories.map(cat =>
            <div key={cat}>
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <h2 className="yellow-heading">{cat}</h2>
                  <table className="table table-striped custab">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th className="text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.items != null &&
                        this.props.items.map((row) => {
                          if (row.category === cat) {
                            return (
                              <tr key={row._id}>
                                {
                                  this.state.displayTableKeys.map((key, j) => {
                                    if (this.state.formatsDisplayTableKeys[j] === 'date') {
                                      const date = row[key].split('T')[0].split('-'); // YYYY-MM-DD
                                      return (
                                        <td key={key}>{date[2]}/{date[1]}/{date[0]}</td>
                                      );
                                    } else if (this.state.formatsDisplayTableKeys[j] === 'money') {
                                      const money = Number(row[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                                      return (
                                        <td key={key}>${money}</td>
                                      );
                                    }
                                    return (
                                      <td key={key}>{row[key]}</td>
                                    );
                                  }, this)
                                }
                                <td className="text-center">
                                  <button className="btn btn-primary btn-xs" onClick={() => ListarItems.openEditModal()}> Detalles </button>
                                  &emsp;
                                  <button className="btn btn-danger btn-xs" onClick={() => this.deleteItem(row._id)}> Eliminar </button>
                                </td>
                              </tr>
                            );
                          } return false;
                        }, this)
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
            </div>
        , this)
        }
        <br />
        <button className="btn btn-success btn-xs pull-right" onClick={() => this.updateItemsList()}> Actualizar Items </button>

      </div>
    );
  }
}

ListarItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    dueDay: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    periodicity: PropTypes.string,
    amount: PropTypes.string,
    completed: PropTypes.bol,
    creator: PropTypes.string,
    username: PropTypes.string,
  })).isRequired,
};

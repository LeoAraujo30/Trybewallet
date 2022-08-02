import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses, editOn } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, removeExpensesDispatch, editOnDispatch } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => {
              const { id, description, tag, method,
                value, currency, exchangeRates } = expense;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{(parseFloat(value)).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{(parseFloat(exchangeRates[currency].ask)).toFixed(2)}</td>
                  <td>{(parseFloat(exchangeRates[currency].ask) * value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editOnDispatch(id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => removeExpensesDispatch(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpensesDispatch: PropTypes.func.isRequired,
  editOnDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editOnDispatch: (id) => dispatch(editOn(id)),
  removeExpensesDispatch: (id) => dispatch(removeExpenses(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

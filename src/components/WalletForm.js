import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, addExpenses } from '../redux/actions';

const categoria = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: categoria,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrenciesDispatch } = this.props;
    getCurrenciesDispatch();
  }

  inpChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // getExchangeRates = (objs) => {
  //   const coins = Object.values(objs)
  //     .filter((obj) => obj.code !== 'DOGE' && obj.codein !== 'BRLT');
  //   return coins.map((coin) => ({
  //     [coin.code]: coin,
  //   }));
  // }

  dispatchExpenses = async () => {
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => this.setState({ exchangeRates: data }));
    const { addExpensesDispatch } = this.props;
    addExpensesDispatch(this.state);
    this.setState((state) => ({
      id: state.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: categoria,
      exchangeRates: {},
    }));
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    const MIN = 0;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.inpChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.inpChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.inpChange }
            >
              { currencies
                .map((coin) => <option key={ coin } value={ coin }>{coin}</option>) }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.inpChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.inpChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            disabled={ !value.length > MIN || !description.length > MIN }
            onClick={ this.dispatchExpenses }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrenciesDispatch: PropTypes.func.isRequired,
  addExpensesDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesDispatch: () => dispatch(getCurrencies()),
  addExpensesDispatch: (expenses) => dispatch(addExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

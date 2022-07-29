import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  expensesTotal = () => {
    const { expenses } = this.props;
    return expenses.map((expense) => {
      const { value, currency, exchangeRates } = expense;
      return parseFloat(exchangeRates[currency].ask) * value;
    }).reduce((acc, coin) => acc + coin, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <h5 data-testid="email-field">{ email }</h5>
        <h5 data-testid="total-field">{this.expensesTotal().toFixed(2)}</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <h5 data-testid="email-field">{ email }</h5>
        <h5 data-testid="total-field">0</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  email: store.user.email,
});

export default connect(mapStateToProps)(Header);

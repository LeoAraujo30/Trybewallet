import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      login: false,
    };
  }

  inpChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  logChange = () => {
    this.setState({
      login: true,
    });
  }

  render() {
    const { email, senha, login } = this.state;
    const { addEmailDispatch } = this.props;
    const MIN = 6;
    if (login === true) return <Redirect to="/carteira" />;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.inpChange }
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              type="password"
              id="senha"
              name="senha"
              data-testid="password-input"
              value={ senha }
              onChange={ this.inpChange }
            />
          </label>
          <button
            type="button"
            disabled={
              !email.includes('@') || senha.length < MIN || !email.includes('.com')
            }
            onClick={ () => { addEmailDispatch(email); this.logChange(); } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  addEmailDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEmailDispatch: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

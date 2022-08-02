import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
import Wallet from '../pages/Wallet';
import Header from '../components/Header';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockStore = { 
  user: { email: 'alguem@alguem.com' }, 
  wallet: {
    // currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF',
    //   'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [
      {
        id: 0,
        value: '1',
        description: 'despesa 1',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
  },
};

afterEach((() => jest.clearAllMocks));

describe('Testando o componente <App />', () => {
  it('Testando a pagina de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    
    const title = screen.getByRole('heading', { name: 'Login', level: 1 });
    const inputEmail = screen.getByLabelText('Email:');
    const inputSenha = screen.getByLabelText('Senha:');
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(title && inputEmail && inputSenha && button).toBeInTheDocument();

    userEvent.type(inputEmail, 'alguem@alguem.com');
    userEvent.type(inputSenha, '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
  it('Testando o componente <Header /> da pagina Wallet', () => {
    renderWithRouterAndRedux(<Header />, { initialState: mockStore });
    
    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');
    expect(email).toHaveTextContent('alguem@alguem.com');
    expect(total).toHaveTextContent('4.75');
    expect(currency).toHaveTextContent('BRL');
    expect(email && total && currency).toBeInTheDocument();
  });
  it('Testando o componente <WalletForm /> da pagina Wallet', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />);
    
    const total = await screen.findByTestId('total-field');
    expect(total).toHaveTextContent('0.00');

    const inputValue = screen.getByTestId('value-input');
    const inputDescripion = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(inputValue && inputDescripion && inputCurrency && inputMethod && inputTag && button)
      .toBeInTheDocument();

    userEvent.type(inputValue, '2');
    userEvent.type(inputDescripion, 'despesa 2');
    userEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(2);

    expect(await screen.findByTestId('total-field')).toHaveTextContent('9.51');
  });
});

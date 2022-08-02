// Coloque aqui suas actions

export const addEmail = (email) => ({ type: 'ADD_EMAIL', email });

const requestCurrencies = () => ({ type: 'REQUEST_CURRENCIES' });

const addCurrencies = (currencies) => ({ type: 'ADD_CURRENCIES', currencies });

export function getCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(addCurrencies(data)));
  };
}

export const addExpenses = (expenses) => ({ type: 'ADD_EXPENSES', expenses });

// export default { addEmail, getCurrencies };

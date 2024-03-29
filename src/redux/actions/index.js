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

export const removeExpenses = (id) => ({ type: 'REMOVE_EXPENSES', id });

export const editOn = (id) => ({ type: 'EDIT_ON', id });

export const editExpenses = (expenses, id) => ({ type: 'EDIT_EXPENSES', expenses, id });

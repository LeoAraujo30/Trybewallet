// Coloque aqui suas actions

export const addEmail = (email) => ({ type: 'ADD_EMAIL', email });

const requestCurrencies = () => ({ type: 'REQUEST_CURRENCIES' });

const addCurrencies = (currencies) => ({ type: 'ADD_CURRENCIES', currencies });

const addError = (error) => ({ type: 'ADD_ERROR', error });

export function getCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(addCurrencies(data)))
      .catch((error) => dispatch(addError(error)));
  };
}

// export default { addEmail, getCurrencies };

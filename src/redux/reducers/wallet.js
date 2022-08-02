// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return ({
      ...state,
    });
  case 'ADD_CURRENCIES':
    return ({
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((coin) => coin !== 'USDT'),
    });
  case 'ADD_EXPENSES':
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
    });
  default:
    return state;
  }
};

export default wallet;

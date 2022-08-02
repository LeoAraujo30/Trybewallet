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
  case 'REMOVE_EXPENSES':
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    });
  default:
    return state;
  }
};

export default wallet;

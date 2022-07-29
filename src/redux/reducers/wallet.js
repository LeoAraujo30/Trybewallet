// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: false,
  error: '',
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return ({
      ...state,
      loading: true,
    });
  case 'ADD_CURRENCIES':
    return ({
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((coin) => coin !== 'USDT'),
      loading: false,
    });
  case 'ADD_ERROR':
    return ({
      ...state,
      error: action.error,
      loading: false,
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

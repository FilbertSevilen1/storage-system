import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  user:{
    id: "",
    name:"",
    email:"",
    role:""
  },
}
function reducers(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      
      return {
        ...state,
        user:{
          id: action.payload.id,
          name: action.payload.name,
          email:action.payload.email,
          role: action.payload.role
        },
      }
    case 'LOGOUT':
      localStorage.removeItem('ss_token')
      localStorage.removeItem('bearer_token');
      return initialState
      
    default:
      return state
  }
}

const store = createStore(reducers)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

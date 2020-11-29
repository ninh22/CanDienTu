import {createStore} from 'redux';

import userReducer from './User/UserReducer';

// Passing burgerReducer to createStore
const store = createStore(userReducer);

export default store;

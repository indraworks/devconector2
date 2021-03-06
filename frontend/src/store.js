import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

/*
kita creae store bilerplate nanti kita exaport dan dipakai di app.js
bungkusnya pakai provider kita wraping
skli lagi ini bolier plate 
jadi create store itu kita createnya di reducer
nah nanti dari component di react kitra trima action 
action ini kirim 2 type data 1 action itu dan payload datanya 
ini yg akan di ambil dan dilakukan update state di store kmudian akan dikirim balik ke 
componentn lagi 
bgitu strusnya utk bisa brhubung dgn reaact maka ini store diimport
module ini di di app.js dgn di warping dgn provider
shingga bisa kerjasama dari <--> react ke store/reducer update statenya

*/

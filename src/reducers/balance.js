import * as constants from '../actions/constants'
import { read_cookie, bake_cookie } from 'sfcookies'

const BALANCE_COOKIE = 'BALANCE_COOKIE';

//reducers take two paramenters (previous state, object containing data (action object (so e.g. our setBlance object)))
const balance = (state = 0, action) => {
  let balance;
  
  switch(action.type){
    case constants.SET_BALANCE:
      //return action.balance;
      balance = action.balance
      break;
    case constants.DEPOSIT:
      //return state + action.deposit;
      balance = state + action.deposit;
      break;
    case constants.WITHDRAW:
      //return state - action.withdrawal;
      balance = state - action.withdrawal;
      break;
    default:
      //return state;
      balance = parseInt(read_cookie(BALANCE_COOKIE)) || state;
  }

  bake_cookie(BALANCE_COOKIE, balance)

  return balance;
}

export default balance
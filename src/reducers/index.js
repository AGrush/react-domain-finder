import { combineReducers } from 'src/reducers/node_modules/redux';
import balance from './balance';
import bitcoin from './bitcoin';

export default combineReducers ({ balance, bitcoin })


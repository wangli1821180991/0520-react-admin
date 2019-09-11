/*根据preState和action来生成newState*/

import {combineReducers } from 'redux';
import {SAVE_USER} from './action-types';
import {setItem,getItem} from '../utils/storage';
//初始化数据
const initUser = {
    user: getItem('user') || {},
    token: getItem('token') || ''
};
function user(preState=initUser,action) {
    switch (action.type) {
        case  SAVE_USER:
            //进行持久化存储
            setItem('user', action.data.user);
            setItem('token', action.data.token);

        return action.data;
        default:
            return preState;
    }
}
export default combineReducers({
    user
})
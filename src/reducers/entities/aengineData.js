// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';
import {AengineDataTypes, UserTypes} from 'action_types';

function shops(state = {}, action) {
    switch (action.type) {
    case AengineDataTypes.RECEIVED_AENGINE_SHOPS: {
        let nextState = {...state};
        if (action.data) {
            nextState = action.data;
        }
        return nextState;
    }

    case UserTypes.LOGOUT_SUCCESS:
        return {};
    default:
        return state;
    }
}

function checkedShopId(state = {}, action) {
    switch (action.type) {
    case AengineDataTypes.RECEIVED_AENGINE_SHOPS: {
        return null;
    }

    case AengineDataTypes.AENGINE_CHECK_SHOP: {
        if (action.data) {
            return action.data;
        }

        return null;
    }

    case UserTypes.LOGOUT_SUCCESS:
        return null;
    default:
        return state;
    }
}

function orders(state = {}, action) {
    switch (action.type) {
    case AengineDataTypes.RECEIVED_AENGINE_ORDER: {
        const nextState = {...state};

        if (action.data) {
            nextState[action.data.aliOrderId] = action.data;
        }

        return nextState;
    }

    case UserTypes.LOGOUT_SUCCESS:
        return {};
    default:
        return state;
    }
}

export default combineReducers({
    checkedShopId,
    orders,
    shops,
});

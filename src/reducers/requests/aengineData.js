// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';
import {AengineDataTypes} from 'action_types';

import {handleRequest, initialRequestState} from './helpers';

import type {GenericAction} from '../../types/actions';
import type {RequestStatusType} from '../../types/requests';

function getAengineOrder(state: RequestStatusType = initialRequestState(), action: GenericAction): RequestStatusType {
    return handleRequest(
        AengineDataTypes.AENGINE_ORDER_REQUEST,
        AengineDataTypes.AENGINE_ORDER_SUCCESS,
        AengineDataTypes.AENGINE_ORDER_FAILURE,
        state,
        action
    );
}

function getAengineShops(state: RequestStatusType = initialRequestState(), action: GenericAction): RequestStatusType {
    return handleRequest(
        AengineDataTypes.AENGINE_SHOPS_REQUEST,
        AengineDataTypes.AENGINE_SHOPS_SUCCESS,
        AengineDataTypes.AENGINE_SHOPS_FAILURE,
        state,
        action
    );
}

export default combineReducers({
    getAengineOrder,
    getAengineShops,
});


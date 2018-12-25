// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {batchActions} from 'redux-batched-actions';

import {Client4} from 'client';
import {AengineDataTypes} from 'action_types';
import {bindClientFunc} from './helpers';

export function getAengineOrder(orderId) {
    return bindClientFunc(
        Client4.getAengineOrder,
        AengineDataTypes.AENGINE_ORDER_REQUEST,
        [AengineDataTypes.AENGINE_ORDER_SUCCESS, AengineDataTypes.RECEIVED_AENGINE_ORDER],
        AengineDataTypes.AENGINE_ORDER_FAILURE,
        orderId
    );
}

export function getAengineShops() {
    return bindClientFunc(
        Client4.getAengineShops,
        AengineDataTypes.AENGINE_SHOPS_REQUEST,
        [AengineDataTypes.AENGINE_SHOPS_SUCCESS, AengineDataTypes.RECEIVED_AENGINE_SHOPS],
        AengineDataTypes.AENGINE_SHOPS_FAILURE,
    );
}

//传入一个shopId，选择一个，传入 null全选，单选
export function checkAengineShop(shopId) {
    return async (dispatch) => {
        dispatch({
            type: AengineDataTypes.AENGINE_CHECK_SHOP,
            data: shopId,
        });
    };
}

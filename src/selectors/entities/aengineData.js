
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export function getAllAengineOrders(state) {
    return state.entities.aengineData.orders;
}

export function getAengineOrder(state, orderId) {
    return getAllAengineOrders(state)[orderId];
}

export function getAllAengineShops(state) {
    return state.entities.aengineData.shops;
}

export function getCheckedAengineShopId(state) {
    return state.entities.aengineData.checkedShopId;
}

export function getAengineShop(state, shopId) {
    return getAllAengineShops(state)[shopId];
}

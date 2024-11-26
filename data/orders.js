export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveOrderToStorage();
}

export function saveOrderToStorage() {
    localStorage.setItem('order', JSON.stringify(orders));
}

export function findOrder(orderId) {
    let matchingOrder;

    orders.forEach((order) => {
        if(order.id === orderId) {
            matchingOrder = order;
            return;
        }
    });

    return matchingOrder;
}